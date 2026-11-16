// Payment processing utilities
import { SHOP_CONFIG } from './config'

export interface CardDetails {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
}

/**
 * Placeholder function for processing card payment.
 * Resolves without charging real money in demo mode.
 *
 * TODO: Integrate production gateway (Razorpay / PayU) using secure server-side SDKs
 * and client-side checkout modal. NEVER store or log card numbers.
 */
export async function processCardPayment(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _details: CardDetails,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _amount: number
): Promise<PaymentResult> {
  // Simulate brief gateway handshake
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (SHOP_CONFIG.cardPaymentsLive) {
    // In live mode with no gateway connected yet
    return {
      success: false,
      error: 'Live card payment gateway is currently undergoing scheduled maintenance. Please use Cash on Delivery.',
    }
  }

  // Demo mode: successfully authorize
  const mockTxId = `TXN-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`
  return {
    success: true,
    transactionId: mockTxId,
  }
}
