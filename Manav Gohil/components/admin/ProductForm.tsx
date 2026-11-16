'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Upload,
  X,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  AlertCircle,
  Check,
} from 'lucide-react'
import { saveProduct, deleteProductPermanently, getStorageUploadUrl } from '@/app/admin/(dashboard)/products/actions'

// ─── Types ───────────────────────────────────────────────────────────────────
interface SizeStock { size: string; stock: number }

interface UploadedImage {
  previewUrl: string  // local blob URL or remote URL
  storagePath?: string // path in Supabase storage
  uploading?: boolean
  error?: string
}

const COLLECTIONS = ['newborn', 'boys', 'girls', 'winterwear', 'sleepwear', 'gifting']
const STANDARD_SIZES = ['NB', '0-3M', '3-6M', '6-12M', '1-2Y', '2-3Y']
const TAG_OPTIONS = ['Best seller', 'New', 'Only few left', 'Pure Cotton', 'Gift Pick']

// ─── Slug helper ─────────────────────────────────────────────────────────────
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200)
}

// ─── Browser image resize ─────────────────────────────────────────────────────
async function resizeImage(file: File, maxPx = 1200, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const ratio = Math.min(maxPx / img.width, maxPx / img.height, 1)
      const w = Math.round(img.width * ratio)
      const h = Math.round(img.height * ratio)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Canvas toBlob failed'))
        },
        'image/jpeg',
        quality
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')) }
    img.src = url
  })
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface ProductFormProps {
  productId: string | null
  initialData: Record<string, unknown> | null
  subcategorySuggestions: string[]
}

export function ProductForm({ productId, initialData, subcategorySuggestions }: ProductFormProps) {
  const router = useRouter()
  const [isDirty, setIsDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Form state ──────────────────────────────────────────────────────────────
  const initial = initialData as Record<string, unknown> | null

  const [name, setName] = useState((initial?.name as string) ?? '')
  const [nameGu, setNameGu] = useState((initial?.name_gu as string) ?? '')
  const [slug, setSlug] = useState((initial?.slug as string) ?? '')
  const [slugEdited, setSlugEdited] = useState(!!productId)
  const [collection, setCollection] = useState((initial?.collection as string) ?? '')
  const [subcategory, setSubcategory] = useState((initial?.subcategory as string) ?? '')
  const [description, setDescription] = useState((initial?.description as string) ?? '')
  const [price, setPrice] = useState((initial?.price as number | undefined)?.toString() ?? '')
  const [oldPrice, setOldPrice] = useState((initial?.old_price as number | null)?.toString() ?? '')
  const [tag, setTag] = useState((initial?.tag as string) ?? '')
  const [featured, setFeatured] = useState((initial?.featured as boolean) ?? false)
  const [fabric, setFabric] = useState((initial?.fabric as string) ?? '')
  const [care, setCare] = useState((initial?.care as string) ?? '')
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>((initial?.status as 'draft' | 'published' | 'archived') ?? 'draft')
  const [colours, setColours] = useState<string[]>((initial?.colours as string[]) ?? [])
  const [colourInput, setColourInput] = useState('')

  // Sizes
  const initialSizes: SizeStock[] = Array.isArray(initial?.sizes)
    ? (initial.sizes as SizeStock[])
    : []
  const [sizes, setSizes] = useState<SizeStock[]>(initialSizes)

  // Images
  const initialImages: string[] = Array.isArray(initial?.images) ? (initial.images as string[]) : []
  const [images, setImages] = useState<UploadedImage[]>(
    initialImages.map((path) => ({ previewUrl: path, storagePath: path }))
  )

  // Auto-generate slug from name when creating
  useEffect(() => {
    if (!slugEdited && name) {
      setSlug(toSlug(name))
    }
  }, [name, slugEdited])

  // Warn before leave with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  const markDirty = () => setIsDirty(true)

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  // ── Discount ─────────────────────────────────────────────────────────────────
  const discountPct = price && oldPrice && parseInt(oldPrice) > parseInt(price)
    ? Math.round((1 - parseInt(price) / parseInt(oldPrice)) * 100)
    : null

  // ── Image upload ──────────────────────────────────────────────────────────────
  const handleFileChange = async (files: FileList | null) => {
    if (!files) return

    const fileArr = Array.from(files)
    const MAX_MB = 5
    const allowed = ['image/jpeg', 'image/png', 'image/webp']

    for (const file of fileArr) {
      if (!allowed.includes(file.type)) {
        showToast(`${file.name}: only JPEG, PNG or WebP allowed`, 'err')
        continue
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        showToast(`${file.name}: file is over ${MAX_MB} MB`, 'err')
        continue
      }
      if (images.length >= 5) {
        showToast('Maximum 5 photos allowed', 'err')
        break
      }

      // Add placeholder immediately
      const previewUrl = URL.createObjectURL(file)
      const idx = images.length
      setImages((prev) => [...prev, { previewUrl, uploading: true }])
      markDirty()

      try {
        // 1. Resize in browser
        const blob = await resizeImage(file)

        // 2. Get signed upload URL from server
        const ext = file.name.split('.').pop() || 'jpg'
        const res = await getStorageUploadUrl(file.name, blob.type || 'image/jpeg')
        if (res.error || !res.signedUrl || !res.path) {
          throw new Error(res.error ?? 'Upload failed')
        }

        // 3. PUT to Supabase Storage
        const uploadRes = await fetch(res.signedUrl, {
          method: 'PUT',
          body: blob,
          headers: { 'Content-Type': blob.type || 'image/jpeg' },
        })
        if (!uploadRes.ok) throw new Error('Storage upload failed')

        // 4. Resolve the public URL
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const publicUrl = supabaseUrl
          ? `${supabaseUrl}/storage/v1/object/public/${res.path}`
          : res.path

        setImages((prev) => {
          const next = [...prev]
          // Find the placeholder by previewUrl
          const foundIdx = next.findIndex((img) => img.previewUrl === previewUrl)
          if (foundIdx !== -1) {
            next[foundIdx] = { previewUrl: publicUrl, storagePath: res.path, uploading: false }
          }
          return next
        })
      } catch (err) {
        setImages((prev) => {
          const next = [...prev]
          const foundIdx = next.findIndex((img) => img.previewUrl === previewUrl)
          if (foundIdx !== -1) {
            next[foundIdx] = { previewUrl, uploading: false, error: 'Upload failed' }
          }
          return next
        })
        showToast(`${file.name}: ${err instanceof Error ? err.message : 'Upload failed'}`, 'err')
      }
    }
  }

  const moveImage = (idx: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
    markDirty()
  }

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
    markDirty()
  }

  // ── Sizes ─────────────────────────────────────────────────────────────────────
  const toggleSize = (size: string) => {
    setSizes((prev) => {
      const exists = prev.find((s) => s.size === size)
      if (exists) return prev.filter((s) => s.size !== size)
      return [...prev, { size, stock: 0 }]
    })
    markDirty()
  }

  const updateStock = (size: string, stock: number) => {
    setSizes((prev) => prev.map((s) => s.size === size ? { ...s, stock } : s))
    markDirty()
  }

  // ── Colours ───────────────────────────────────────────────────────────────────
  const addColour = () => {
    const c = colourInput.trim()
    if (!c || colours.includes(c)) return
    setColours((prev) => [...prev, c])
    setColourInput('')
    markDirty()
  }

  // ── Save ──────────────────────────────────────────────────────────────────────
  const handleSave = async (targetStatus?: 'draft' | 'published' | 'archived') => {
    // Prevent saving if any image is still uploading
    if (images.some((img) => img.uploading)) {
      showToast('Please wait for photos to finish uploading', 'err')
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.set('slug', slug)
      formData.set('name', name)
      formData.set('name_gu', nameGu)
      formData.set('collection', collection)
      formData.set('subcategory', subcategory)
      formData.set('description', description)
      formData.set('price', price)
      formData.set('old_price', oldPrice)
      formData.set('sizes', JSON.stringify(sizes))
      formData.set('colours', JSON.stringify(colours))
      formData.set('fabric', fabric)
      formData.set('care', care)
      formData.set('tag', tag)
      formData.set('images', JSON.stringify(images.filter((i) => i.storagePath).map((i) => i.storagePath!)))
      formData.set('status', targetStatus ?? status)
      formData.set('featured', String(featured))

      const res = await saveProduct(productId, formData)
      if (res.error) {
        showToast(res.error, 'err')
      } else {
        setIsDirty(false)
        showToast('Saved!')
        if (!productId && res.productId) {
          router.push(`/admin/products/${res.productId}`)
        }
      }
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────────
  const handleDeletePermanently = async () => {
    if (!productId) return
    setDeleting(true)
    try {
      await deleteProductPermanently(productId)
      // deleteProductPermanently calls redirect
    } catch {
      showToast('Delete failed', 'err')
      setDeleting(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────────
  return (
    <div className="pb-32">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${toast.type === 'ok' ? 'bg-[#dce7da] text-[#2d6a34]' : 'bg-[#f7dcd4] text-[#b84a4a]'}`}>
          {toast.type === 'ok' ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="flex flex-col gap-6">

        {/* ── Photos ─────────────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Photos</h2>
          <p className="text-xs text-[#846e68] mb-3">First photo is the main image. Up to 5 photos. Max 5 MB each (JPEG, PNG or WebP).</p>

          {/* Photo grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[#eaded6] bg-[#f0e9e4]">
                  {img.uploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#f0e9e4]">
                      <div className="w-6 h-6 border-2 border-[#382d2d] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : img.error ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#f7dcd4]">
                      <AlertCircle size={20} className="text-[#b84a4a]" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.previewUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {idx === 0 && !img.uploading && (
                    <span className="absolute bottom-1 left-1 rounded-full bg-[#382d2d]/80 px-1.5 py-0.5 text-[9px] font-bold text-white">Main</span>
                  )}
                  {/* Controls */}
                  <div className="absolute top-1 right-1 flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#b84a4a] shadow-sm"
                      aria-label="Remove photo"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <div className="absolute bottom-1 right-1 flex flex-col gap-0.5">
                    {idx > 0 && (
                      <button type="button" onClick={() => moveImage(idx, -1)} className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#382d2d] shadow-sm" aria-label="Move photo up">
                        <ChevronUp size={11} />
                      </button>
                    )}
                    {idx < images.length - 1 && (
                      <button type="button" onClick={() => moveImage(idx, 1)} className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#382d2d] shadow-sm" aria-label="Move photo down">
                        <ChevronDown size={11} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {images.length < 5 && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
                aria-label="Upload photos"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#ddd0c8] py-6 text-sm font-medium text-[#846e68] hover:border-[#382d2d] hover:text-[#382d2d] transition-colors min-h-[44px]"
              >
                <Upload size={18} aria-hidden />
                Add photos (camera or gallery)
              </button>
            </>
          )}
        </section>

        {/* ── Basics ─────────────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Basics</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-name">Name *</label>
              <input
                id="pf-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); markDirty() }}
                placeholder="e.g. Cotton Cloud Romper"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-name-gu">Gujarati name</label>
              <input
                id="pf-name-gu"
                type="text"
                value={nameGu}
                onChange={(e) => { setNameGu(e.target.value); markDirty() }}
                placeholder="e.g. કૉટન ક્લાઉડ રોમ્પર"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-collection">Collection *</label>
                <select
                  id="pf-collection"
                  value={collection}
                  onChange={(e) => { setCollection(e.target.value); markDirty() }}
                  className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px] bg-white capitalize"
                  required
                >
                  <option value="">Select collection</option>
                  {COLLECTIONS.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-subcat">Sub-category</label>
                <input
                  id="pf-subcat"
                  type="text"
                  list="pf-subcat-list"
                  value={subcategory}
                  onChange={(e) => { setSubcategory(e.target.value); markDirty() }}
                  placeholder="e.g. Rompers"
                  className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
                />
                <datalist id="pf-subcat-list">
                  {subcategorySuggestions.map((s) => <option key={s} value={s} />)}
                </datalist>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-desc">Description</label>
              <textarea
                id="pf-desc"
                value={description}
                onChange={(e) => { setDescription(e.target.value); markDirty() }}
                rows={3}
                placeholder="Brief description shown on the product page"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-tag">Tag</label>
                <select
                  id="pf-tag"
                  value={tag}
                  onChange={(e) => { setTag(e.target.value); markDirty() }}
                  className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px] bg-white"
                >
                  <option value="">No tag</option>
                  {TAG_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex items-end pb-0.5">
                <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => { setFeatured(e.target.checked); markDirty() }}
                    className="accent-[#382d2d] w-4 h-4"
                  />
                  <span className="text-sm font-medium text-[#382d2d]">Featured / New arrival</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-slug">URL slug *</label>
              <input
                id="pf-slug"
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')); setSlugEdited(true); markDirty() }}
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-[#382d2d] min-h-[44px]"
                required
              />
              <p className="mt-1 text-xs text-[#846e68]">/product/<strong>{slug || 'your-slug'}</strong></p>
            </div>
          </div>
        </section>

        {/* ── Price ──────────────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Price</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-price">Price (₹) *</label>
              <input
                id="pf-price"
                type="number"
                min="1"
                step="1"
                value={price}
                onChange={(e) => { setPrice(e.target.value); markDirty() }}
                placeholder="499"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-old-price">Old price (₹)</label>
              <input
                id="pf-old-price"
                type="number"
                min="1"
                step="1"
                value={oldPrice}
                onChange={(e) => { setOldPrice(e.target.value); markDirty() }}
                placeholder="699 (optional)"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
              />
            </div>
          </div>
          {discountPct !== null && (
            <p className="mt-2 text-sm font-semibold text-[#2d6a34]">
              Discount: {discountPct}% off
            </p>
          )}
        </section>

        {/* ── Sizes & Stock ─────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Sizes &amp; Stock</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {STANDARD_SIZES.map((sz) => {
              const active = sizes.some((s) => s.size === sz)
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => toggleSize(sz)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold min-h-[44px] transition-colors ${active ? 'border-[#382d2d] bg-[#382d2d] text-white' : 'border-[#eaded6] text-[#382d2d] hover:border-[#382d2d]'}`}
                >
                  {sz}
                </button>
              )
            })}
          </div>
          {sizes.length > 0 && (
            <div className="flex flex-col gap-3">
              {sizes.map((s) => (
                <div key={s.size} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#382d2d] w-16 shrink-0">{s.size}</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={s.stock}
                    onChange={(e) => updateStock(s.size, Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-24 rounded-xl border border-[#eaded6] px-3 py-2 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
                    aria-label={`Stock for size ${s.size}`}
                  />
                  <span className="text-xs text-[#846e68]">in stock</span>
                  <button
                    type="button"
                    onClick={() => setSizes((prev) => prev.filter((x) => x.size !== s.size))}
                    className="ml-auto flex size-9 items-center justify-center rounded-xl text-[#b84a4a] hover:bg-[#f7dcd4]"
                    aria-label={`Remove size ${s.size}`}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Colours ──────────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Colours</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {colours.map((c) => (
              <span key={c} className="flex items-center gap-1 rounded-full bg-[#f0e9e4] px-3 py-1 text-sm text-[#382d2d]">
                {c}
                <button
                  type="button"
                  onClick={() => { setColours((prev) => prev.filter((x) => x !== c)); markDirty() }}
                  className="text-[#846e68] hover:text-[#b84a4a]"
                  aria-label={`Remove colour ${c}`}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={colourInput}
              onChange={(e) => setColourInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addColour() } }}
              placeholder="Add colour..."
              className="flex-1 rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
            />
            <button
              type="button"
              onClick={addColour}
              className="flex size-11 items-center justify-center rounded-xl border border-[#eaded6] text-[#382d2d] hover:bg-[#f0e9e4]"
              aria-label="Add colour"
            >
              <Plus size={18} />
            </button>
          </div>
        </section>

        {/* ── Fabric & Care ─────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Fabric &amp; Care</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-fabric">Fabric</label>
              <input
                id="pf-fabric"
                type="text"
                value={fabric}
                onChange={(e) => { setFabric(e.target.value); markDirty() }}
                placeholder="e.g. 100% Combed Organic Cotton"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6b5a54] mb-1" htmlFor="pf-care">Care instructions</label>
              <textarea
                id="pf-care"
                value={care}
                onChange={(e) => { setCare(e.target.value); markDirty() }}
                rows={2}
                placeholder="e.g. Gentle hand wash or mild machine cycle"
                className="w-full rounded-xl border border-[#eaded6] px-3 py-2.5 text-sm focus:outline-none focus:border-[#382d2d] resize-none"
              />
            </div>
          </div>
        </section>

        {/* ── Status ────────────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[#eaded6] bg-white p-5">
          <h2 className="font-semibold text-[#382d2d] mb-4">Status</h2>
          <div className="flex flex-wrap gap-3">
            {(['draft', 'published', 'archived'] as const).map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={() => { setStatus(s); markDirty() }}
                  className="accent-[#382d2d]"
                />
                <span className="text-sm font-medium capitalize text-[#382d2d]">{s}</span>
              </label>
            ))}
          </div>
          {productId && status === 'published' && (
            <a
              href={`/product/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#db6e78] hover:underline"
            >
              <ExternalLink size={13} aria-hidden />
              Preview on shop
            </a>
          )}
        </section>

        {/* ── Danger Zone ───────────────────────────────────────────────────── */}
        {productId && (
          <section className="rounded-2xl border border-[#f7dcd4] bg-white p-5">
            <h2 className="font-semibold text-[#b84a4a] mb-3">Danger zone</h2>
            {!deleteConfirm ? (
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="flex items-center gap-2 rounded-xl border border-[#f7dcd4] px-4 py-2.5 text-sm font-semibold text-[#b84a4a] hover:bg-[#f7dcd4] transition-colors min-h-[44px]"
              >
                <Trash2 size={15} aria-hidden />
                Delete product permanently
              </button>
            ) : (
              <div className="flex flex-col gap-3 rounded-xl bg-[#f7dcd4]/50 p-4">
                <p className="text-sm font-semibold text-[#b84a4a]">
                  This will permanently delete the product and all its photos. This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(false)}
                    className="flex-1 rounded-xl border border-[#eaded6] py-2.5 text-sm font-semibold text-[#6b5a54] min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeletePermanently}
                    disabled={deleting}
                    className="flex-1 rounded-xl bg-[#b84a4a] text-white py-2.5 text-sm font-bold disabled:opacity-50 min-h-[44px]"
                  >
                    {deleting ? 'Deleting…' : 'Yes, delete permanently'}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* ── Sticky Save Bar ────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#eaded6] bg-[#fffaf6]/95 backdrop-blur-sm px-4 py-3 md:pl-64">
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          {isDirty && (
            <span className="text-xs text-[#846e68] mr-auto">Unsaved changes</span>
          )}
          <div className="flex gap-2 ml-auto">
            {status !== 'published' && (
              <button
                type="button"
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="rounded-xl border border-[#eaded6] px-4 py-2.5 text-sm font-semibold text-[#382d2d] disabled:opacity-50 min-h-[44px] hover:bg-[#f0e9e4]"
              >
                Save draft
              </button>
            )}
            <button
              type="button"
              onClick={() => handleSave(status === 'published' ? 'published' : undefined)}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#382d2d] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50 min-h-[44px] hover:bg-[#4a3b3b]"
            >
              <Save size={15} aria-hidden />
              {saving ? 'Saving…' : status === 'published' ? 'Save & publish' : 'Save'}
            </button>
            {status !== 'published' && (
              <button
                type="button"
                onClick={() => handleSave('published')}
                disabled={saving}
                className="rounded-xl bg-[#2d6a34] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50 min-h-[44px] hover:bg-[#235228]"
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
