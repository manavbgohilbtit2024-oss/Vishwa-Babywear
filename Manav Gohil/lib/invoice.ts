// Client-side PDF Invoice Generator using jsPDF and jspdf-autotable
// IMPORTANT: English text only and 'Rs.' instead of '₹' to ensure proper rendering with standard jsPDF fonts.

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Order } from './orders'
import { SHOP_CONFIG } from './config'

export function generateInvoicePdf(order: Order): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()

  // Header branding
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(56, 45, 45) // #382d2d
  doc.text(SHOP_CONFIG.name, 14, 22)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(107, 90, 84) // #6b5a54
  doc.text(SHOP_CONFIG.address, 14, 28)
  doc.text(`Phone: ${SHOP_CONFIG.phone}`, 14, 33)

  if (SHOP_CONFIG.gstin && SHOP_CONFIG.gstin.trim() !== '') {
    doc.text(`GSTIN: ${SHOP_CONFIG.gstin}`, 14, 38)
  }

  // Invoice Title & Meta (right-aligned)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(219, 110, 120) // #db6e78 accent
  doc.text('INVOICE', pageWidth - 14, 22, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(56, 45, 45)
  doc.text(`Invoice No: ${order.id}`, pageWidth - 14, 28, { align: 'right' })
  doc.text(`Date: ${order.date}`, pageWidth - 14, 33, { align: 'right' })
  doc.text(`Payment: ${order.paymentMethod} (${order.paymentStatus})`, pageWidth - 14, 38, { align: 'right' })

  // Decorative divider line
  doc.setDrawColor(240, 222, 216) // #f0ded8
  doc.setLineWidth(0.5)
  doc.line(14, 43, pageWidth - 14, 43)

  // Billed To Section
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(56, 45, 45)
  doc.text('BILLED TO / SHIP TO:', 14, 50)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(order.customer.fullName, 14, 56)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(107, 90, 84)
  doc.text(`Mobile: +91 ${order.customer.mobile}`, 14, 61)
  if (order.customer.email) {
    doc.text(`Email: ${order.customer.email}`, 14, 66)
  }

  const addressLine = `${order.customer.address}, ${order.customer.area}`
  const cityPincode = `${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`
  const yAddr = order.customer.email ? 71 : 66
  doc.text(addressLine, 14, yAddr)
  doc.text(cityPincode, 14, yAddr + 5)

  if (order.customer.note) {
    doc.text(`Note: ${order.customer.note}`, 14, yAddr + 10)
  }

  const tableStartY = yAddr + (order.customer.note ? 16 : 12)

  // Items table
  const tableRows = order.items.map((item, index) => [
    (index + 1).toString(),
    item.name,
    item.size,
    item.quantity.toString(),
    `Rs. ${item.price.toFixed(2)}`,
    `Rs. ${(item.price * item.quantity).toFixed(2)}`,
  ])

  autoTable(doc, {
    startY: tableStartY,
    head: [['#', 'Item Description', 'Size', 'Qty', 'Rate', 'Amount']],
    body: tableRows,
    theme: 'plain',
    headStyles: {
      fillColor: [247, 220, 212], // #f7dcd4 pastel pink
      textColor: [56, 45, 45],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    styles: {
      font: 'helvetica',
      fontSize: 9,
      textColor: [56, 45, 45],
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 25, halign: 'right' },
      5: { cellWidth: 25, halign: 'right' },
    },
    alternateRowStyles: {
      fillColor: [255, 250, 246], // #fffaf6 cream
    },
  })

  // Summary section
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastY = ((doc as any).lastAutoTable?.finalY ?? 134) + 6

  const summaryXLabel = pageWidth - 65
  const summaryXVal = pageWidth - 14

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(107, 90, 84)

  doc.text('Subtotal:', summaryXLabel, lastY)
  doc.text(`Rs. ${order.subtotal.toFixed(2)}`, summaryXVal, lastY, { align: 'right' })

  const deliveryText = order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee.toFixed(2)}`
  doc.text('Delivery Charges:', summaryXLabel, lastY + 5)
  doc.text(deliveryText, summaryXVal, lastY + 5, { align: 'right' })

  doc.setDrawColor(240, 222, 216)
  doc.line(summaryXLabel - 5, lastY + 8, summaryXVal, lastY + 8)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(56, 45, 45)
  doc.text('Total Amount:', summaryXLabel, lastY + 14)
  doc.text(`Rs. ${order.total.toFixed(2)}`, summaryXVal, lastY + 14, { align: 'right' })

  // Footer / Thank You Note
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(107, 90, 84)
  doc.text(
    'Thank you for shopping at Vishwa Babywear! For exchanges or questions, contact +91 97141 02151.',
    pageWidth / 2,
    pageHeight - 16,
    { align: 'center' }
  )

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(170, 149, 142)
  doc.text('Computer-generated invoice. No signature required.', pageWidth / 2, pageHeight - 10, {
    align: 'center',
  })

  const invoiceUrl = URL.createObjectURL(doc.output('blob'))
  const downloadLink = document.createElement('a')
  downloadLink.href = invoiceUrl
  downloadLink.download = `Invoice-${order.id}.pdf`
  downloadLink.click()
  window.setTimeout(() => URL.revokeObjectURL(invoiceUrl), 1000)
}
