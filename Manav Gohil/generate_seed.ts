import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { PRODUCTS } from './lib/products'

const sqlStatements = PRODUCTS.map(p => {
  const sizes = p.sizes.map(size => ({ size, stock: p.stock[size] || 0 }))
  const description = p.description ? `'${p.description.replace(/'/g, "''")}'` : 'NULL'
  const name_gu = p.gujaratiName ? `'${p.gujaratiName.replace(/'/g, "''")}'` : 'NULL'
  const old_price = p.oldPrice ? p.oldPrice : 'NULL'
  const tag = p.tag ? `'${p.tag.replace(/'/g, "''")}'` : 'NULL'
  
  return `
INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  '${p.slug}', 
  '${p.name.replace(/'/g, "''")}', 
  ${name_gu}, 
  '${p.collection}', 
  '${p.subcategory.replace(/'/g, "''")}', 
  ${description}, 
  ${p.price}, 
  ${old_price}, 
  '${JSON.stringify(sizes)}'::jsonb, 
  ARRAY[${p.colours.map(c => `'${c.replace(/'/g, "''")}'`).join(', ')}]::text[], 
  '${p.fabric.replace(/'/g, "''")}', 
  '${p.care.replace(/'/g, "''")}', 
  ${tag}, 
  ARRAY[]::text[], 
  '${p.crop}', 
  'published', 
  ${p.isNewArrival || false}
) ON CONFLICT (slug) DO NOTHING;`
}).join('\n')

writeFileSync(join(__dirname, 'supabase', 'seed.sql'), sqlStatements)
console.log('Seed SQL generated successfully')
