
INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'pure-cotton-first-layer-bodysuit', 
  'Pure Cotton First Layer Bodysuit', 
  'પ્યોર કૉટન ફર્સ્ટ લેયર બોડીસૂટ', 
  'newborn', 
  'Bodysuits', 
  'Ultra-gentle front-snap bodysuit designed so you never have to pull clothing over baby’s delicate head.', 
  349, 
  449, 
  '[{"size":"NB","stock":8},{"size":"0-3M","stock":5},{"size":"3-6M","stock":2}]'::jsonb, 
  ARRAY['Milky White', 'Soft Peach', 'Sky Blue']::text[], 
  '100% Combed Organic Cotton (Interlock knit)', 
  'Gentle hand wash or mild machine cycle, dry inside out in shade', 
  'Best seller', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'mulmul-soft-swaddle-wrap-pack', 
  'Mulmul Soft Swaddle Wrap (Pack of 2)', 
  'મલમલ સોફ્ટ સ્વેડલ રૅપ (૨ નું પેક)', 
  'newborn', 
  'Swaddles', 
  'Breathable, feather-light traditional mulmul cloths for calming snug swaddling and midday naps.', 
  599, 
  799, 
  '[{"size":"Free Size","stock":12}]'::jsonb, 
  ARRAY['Pastel Mint & Yellow', 'Ivory Floral']::text[], 
  '100% Traditional Cotton Mulmul', 
  'Hand wash with mild baby detergent, gets softer with each wash', 
  'Pure Cotton', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'knot-top-organic-cap-pair', 
  'Knot-Top Organic Cap Pair', 
  'નોટ-ટોપ ઓર્ગેનિક કેપ જોડી', 
  'newborn', 
  'Caps', 
  'Adjustable top-knot design that keeps newborn ears covered without leaving tight elastic marks.', 
  249, 
  320, 
  '[{"size":"NB","stock":6},{"size":"0-3M","stock":4}]'::jsonb, 
  ARRAY['Cream & Blush', 'Sage & Vanilla']::text[], 
  'Super-soft Ribbed Cotton', 
  'Hand wash, avoid wringing', 
  'New', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'no-scratch-cotton-mittens-set', 
  'No-Scratch Cotton Mittens (Set of 3)', 
  'નો-સ્ક્રેચ કૉટન મિટન્સ (૩ જોડી)', 
  'newborn', 
  'Mittens', 
  'Soft stretch cuffs ensure gloves stay in place while guarding tender faces from tiny nails.', 
  199, 
  249, 
  '[{"size":"NB","stock":15},{"size":"0-3M","stock":9}]'::jsonb, 
  ARRAY['Assorted Pastels']::text[], 
  '100% Combed Cotton', 
  'Machine wash warm, tumble dry low', 
  NULL, 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'cushioned-stay-on-booties', 
  'Cushioned Stay-On Booties', 
  'કુશન્ડ સ્ટે-ઓન બૂટીઝ', 
  'newborn', 
  'Booties', 
  'Designed with a double snap cuff so tiny kicking feet cannot slip them off easily.', 
  299, 
  399, 
  '[{"size":"0-3M","stock":7},{"size":"3-6M","stock":3}]'::jsonb, 
  ARRAY['Soft Beige', 'Powder Pink', 'Pale Sky']::text[], 
  'Fleece lined Cotton Knit', 
  'Hand wash, dry flat', 
  NULL, 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'kimono-wrap-front-bodysuit', 
  'Kimono Wrap Front Bodysuit', 
  'કિમોનો રૅપ ફ્રન્ટ બોડીસૂટ', 
  'newborn', 
  'Bodysuits', 
  'Side tie-closure ensures no metal snaps press on the umbilical cord during the first weeks.', 
  399, 
  NULL, 
  '[{"size":"NB","stock":5},{"size":"0-3M","stock":4},{"size":"3-6M","stock":1}]'::jsonb, 
  ARRAY['Honey Yellow', 'Sage Mist']::text[], 
  '100% Breathable Cotton', 
  'Gentle wash inside out', 
  'Only few left', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'heritage-printed-swaddle-cloth', 
  'Heritage Hand-Block Swaddle Sheet', 
  'હેરીટેજ હેન્ડ-બ્લૉક સ્વેડલ શીટ', 
  'newborn', 
  'Swaddles', 
  'Large 110x110cm breathable swaddle doubles as a pram cover, nursing drape, or cot sheet.', 
  499, 
  650, 
  '[{"size":"Free Size","stock":8}]'::jsonb, 
  ARRAY['Jaipur Elephant', 'Little Sparrows']::text[], 
  'Azo-free Natural Dyed Mulmul', 
  'Cold hand wash with mild soap', 
  'Best seller', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'ribbed-newborn-beanie-cap', 
  'Ribbed Newborn Beanie Cap', 
  'રિબ્ડ નવજાત બિની કેપ', 
  'newborn', 
  'Caps', 
  'Soft stretchy ribbing that expands comfortably as baby grows.', 
  180, 
  NULL, 
  '[{"size":"NB","stock":10},{"size":"0-3M","stock":6}]'::jsonb, 
  ARRAY['Off White', 'Lavender Dust']::text[], 
  'Organic Cotton Stretch Rib', 
  'Hand wash cold', 
  NULL, 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'cotton-cloud-romper', 
  'Cotton Cloud Romper', 
  'કૉટન ક્લાઉડ રોમ્પર', 
  'boys', 
  'Rompers', 
  'One-piece essential with shoulder buttons and full crotch snaps for hassle-free diaper changes.', 
  499, 
  699, 
  '[{"size":"0-3M","stock":5},{"size":"3-6M","stock":4},{"size":"6-12M","stock":6},{"size":"1-2Y","stock":2}]'::jsonb, 
  ARRAY['Sky Cloud Print', 'Dusty Olive']::text[], 
  '100% Breathable Single Jersey Cotton', 
  'Machine wash inside out, gentle iron if needed', 
  'Best seller', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'sunshine-co-ord-set', 
  'Sunshine Co-ord Set', 
  'સનશાઇન સેટ', 
  'boys', 
  'Sets', 
  'A breezy tee and matching drawstring shorts made for crawling adventures and outdoor park strolls.', 
  599, 
  799, 
  '[{"size":"3-6M","stock":3},{"size":"6-12M","stock":2},{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":1}]'::jsonb, 
  ARRAY['Mustard Yellow & Grey', 'Nautical Navy & Cream']::text[], 
  'Slub Cotton with Soft Elastic Waist', 
  'Machine wash 30°C, hang dry', 
  'Only few left', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'linen-blend-mandarin-shirt-shorts', 
  'Linen Blend Mandarin Shirt & Shorts', 
  'લિનેન બ્લેન્ડ મેન્ડેરિન શર્ટ અને શોર્ટ્સ', 
  'boys', 
  'Shirts & Shorts', 
  'A smart collarless shirt with coconut buttons paired with tailored yet comfy elasticated cotton shorts.', 
  749, 
  999, 
  '[{"size":"6-12M","stock":4},{"size":"1-2Y","stock":5},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Sage Green', 'Warm Rust', 'White']::text[], 
  '60% Linen, 40% Pure Cotton', 
  'Hand wash or gentle cycle, medium steam iron', 
  'New', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'little-nawab-kurta-pyjama-set', 
  'Little Nawab Kurta Pyjama Set', 
  'લિટલ નવાબ કુરતા પાયજામા સેટ', 
  'boys', 
  'Ethnic wear', 
  'Festive elegance without the itchiness. 100% cotton lined so baby stays happy throughout weddings and pujas.', 
  899, 
  1199, 
  '[{"size":"6-12M","stock":3},{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Turmeric Yellow & Cream', 'Royal Blue & White']::text[], 
  'Soft Cotton Silk Blend with Cotton Lining', 
  'Dry clean recommended or gentle hand wash', 
  'Best seller', 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'striped-dino-pocket-romper', 
  'Striped Dino Pocket Romper', 
  'સ્ટ્રાઇપ્ડ ડીનો પોકેટ રોમ્પર', 
  'boys', 
  'Rompers', 
  'Playful mini chest pocket with cute embroidered dinosaur artwork.', 
  449, 
  NULL, 
  '[{"size":"0-3M","stock":6},{"size":"3-6M","stock":5},{"size":"6-12M","stock":4},{"size":"1-2Y","stock":0}]'::jsonb, 
  ARRAY['Aqua Stripe', 'Charcoal Stripe']::text[], 
  '100% Bio-Washed Cotton', 
  'Normal machine wash', 
  NULL, 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'resort-leaf-printed-shirt-shorts', 
  'Resort Leaf Printed Shirt & Shorts', 
  'રીસોર્ટ લીફ પ્રિન્ટેડ શર્ટ અને શોર્ટ્સ', 
  'boys', 
  'Shirts & Shorts', 
  'Relaxed cuban collar shirt paired with matching easy-pull shorts.', 
  699, 
  849, 
  '[{"size":"6-12M","stock":5},{"size":"1-2Y","stock":3},{"size":"2-3Y","stock":4}]'::jsonb, 
  ARRAY['Palm Green', 'Ocean Sand']::text[], 
  'Lightweight Cambric Cotton', 
  'Machine wash cold', 
  NULL, 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'everyday-waffle-knit-lounge-set', 
  'Everyday Waffle Knit Lounge Set', 
  'એવરીડે વોફલ નીટ લાઉન્જ સેટ', 
  'boys', 
  'Sets', 
  'Cosy waffle knit that regulates baby’s temperature indoors and outdoors.', 
  549, 
  NULL, 
  '[{"size":"3-6M","stock":4},{"size":"6-12M","stock":5},{"size":"1-2Y","stock":2},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Mocha Brown', 'Pebble Grey']::text[], 
  'Thermal Texture Cotton Waffle', 
  'Wash cold, reshape while damp', 
  NULL, 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'dhoti-kurta-festive-ensemble', 
  'Dhoti Kurta Festive Ensemble', 
  'ધોતી કુરતા ફેસ્ટિવ સંગ્રહ', 
  'boys', 
  'Ethnic wear', 
  'Pre-stitched elastic waist dhoti with zari bordered cotton kurta for Diwali and family functions.', 
  949, 
  1250, 
  '[{"size":"6-12M","stock":2},{"size":"1-2Y","stock":3},{"size":"2-3Y","stock":1}]'::jsonb, 
  ARRAY['Maroon & Gold', 'Emerald & Cream']::text[], 
  'Chanderi Jacquard with Pure Cotton Underside', 
  'Dry clean only', 
  'Gift Pick', 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'little-bloom-frock', 
  'Little Bloom Frock', 
  'લિટલ બ્લૂમ ફ્રોક', 
  'girls', 
  'Frocks', 
  'A charming puff-sleeve frock adorned with hand-smocked details and soft cotton underskirt.', 
  649, 
  899, 
  '[{"size":"3-6M","stock":4},{"size":"6-12M","stock":6},{"size":"1-2Y","stock":5},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Vintage Rose', 'Buttercup Daisy']::text[], 
  '100% Breathable Floral Poplin with Cotton Voile Lining', 
  'Gentle machine wash cold, warm iron on reverse', 
  'New', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'pastel-meadow-peplum-set', 
  'Pastel Meadow Peplum Set', 
  'પેસ્ટલ મેડો પેપલમ સેટ', 
  'girls', 
  'Sets', 
  'Ruffled peplum top with matching bloomers / culottes featuring gentle elastic bands.', 
  699, 
  899, 
  '[{"size":"6-12M","stock":3},{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Lavender & Mint', 'Blush & Lemon']::text[], 
  'Soft Cotton Cambric', 
  'Wash inside out, dry in shade', 
  'Best seller', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'ruffle-shoulder-garden-romper', 
  'Ruffle Shoulder Garden Romper', 
  'રફલ શોલ્ડર ગાર્ડન રોમ્પર', 
  'girls', 
  'Rompers', 
  'Flutter ruffle sleeves with snap buttons at bottom for effortless dressing and playing.', 
  499, 
  650, 
  '[{"size":"0-3M","stock":5},{"size":"3-6M","stock":3},{"size":"6-12M","stock":4},{"size":"1-2Y","stock":2}]'::jsonb, 
  ARRAY['Strawberry Milk', 'Mint Flora']::text[], 
  '100% Combed Rib Cotton', 
  'Machine wash warm', 
  'Pure Cotton', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'chandani-lehenga-choli-set', 
  'Chandani Cotton Lehenga Choli Set', 
  'ચાંદની કૉટન લહેંગા ચોલી સેટ', 
  'girls', 
  'Ethnic wear', 
  'Lightweight festive lehenga designed without bulky can-can so your little princess can dance freely.', 
  999, 
  1399, 
  '[{"size":"6-12M","stock":2},{"size":"1-2Y","stock":3},{"size":"2-3Y","stock":1}]'::jsonb, 
  ARRAY['Rani Pink & Mustard', 'Peacock Teal & Orange']::text[], 
  'Cotton with Gota Patti Lace and Full Cotton Lining', 
  'Dry clean or very gentle cold hand wash', 
  'Gift Pick', 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'tier-twirl-linen-sundress', 
  'Tier Twirl Linen Sundress', 
  'ટિયર ટ્વર્લ લિનેન સનડ્રેસ', 
  'girls', 
  'Frocks', 
  'Three tiered flared dress that swings delightfully with every wobble and step.', 
  599, 
  NULL, 
  '[{"size":"6-12M","stock":5},{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Sunflower Yellow', 'Powder Coral']::text[], 
  'Cotton Linen Blend', 
  'Hand wash cold', 
  NULL, 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'cherry-applique-dungaree-set', 
  'Cherry Applique Dungaree Set', 
  'ચેરી એપ્લીક ડંગરી સેટ', 
  'girls', 
  'Sets', 
  'Adjustable shoulder straps with wooden buttons and a soft jersey inner tee included.', 
  749, 
  899, 
  '[{"size":"6-12M","stock":3},{"size":"1-2Y","stock":2},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Soft Denim Blue & White', 'Dusty Rose & Cream']::text[], 
  'Soft Cotton Twill + Knitted Tee', 
  'Machine wash 30°C', 
  'Only few left', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'anarkali-kurti-with-dhoti-pants', 
  'Anarkali Kurti with Dhoti Pants', 
  'અનારકલી કુર્તી અને ધોતી પેન્ટ્સ', 
  'girls', 
  'Ethnic wear', 
  'Graceful flared kurti with soft elasticated cowl dhoti pants for easy movement.', 
  899, 
  1150, 
  '[{"size":"6-12M","stock":4},{"size":"1-2Y","stock":3},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Pista Green & Baby Pink', 'Marigold Yellow']::text[], 
  'Pure Cotton Mulmul with Golden Print', 
  'Gentle hand wash separate', 
  NULL, 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'polka-dot-cotton-bloomer-romper', 
  'Polka Dot Cotton Bloomer Romper', 
  'પોલ્કા ડૉટ કૉટન બ્લૂમર રોમ્પર', 
  'girls', 
  'Rompers', 
  'Classic vintage dots with elastic ruffle leg openings that never pinch chubby thighs.', 
  420, 
  NULL, 
  '[{"size":"0-3M","stock":6},{"size":"3-6M","stock":4},{"size":"6-12M","stock":2}]'::jsonb, 
  ARRAY['Ivory with Red Dots', 'Pastel Pink Dots']::text[], 
  '100% Cotton Poplin', 
  'Machine wash warm', 
  NULL, 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'cozy-bear-knit-sweater', 
  'Cozy Bear Knit Cardigan Sweater', 
  'કોઝી બેર નીટ કાર્ડિગન સ્વેટર', 
  'winterwear', 
  'Sweaters', 
  'Chunky yet light wooden button sweater with adorable bear ear accents on the pockets.', 
  699, 
  949, 
  '[{"size":"3-6M","stock":4},{"size":"6-12M","stock":5},{"size":"1-2Y","stock":3},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Warm Oatmeal', 'Dusty Blue', 'Blush Peach']::text[], 
  'Ultra-soft Cashmere-touch Acrylic Cotton Yarn', 
  'Gentle hand wash in cold water, dry flat in shade', 
  'Best seller', 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'quilted-hooded-puffer-jacket', 
  'Quilted Hooded Cloud Jacket', 
  'ક્વિલ્ટેડ હૂડેડ ક્લાઉડ જેકેટ', 
  'winterwear', 
  'Jackets', 
  'Lightweight warmth that protects from morning and evening breeze without bulky stiffness.', 
  899, 
  1299, 
  '[{"size":"6-12M","stock":3},{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":1}]'::jsonb, 
  ARRAY['Caramel Cream', 'Sage Green', 'Rose Dust']::text[], 
  'Windproof Shell with Micro-fleece Lining and Polyfill', 
  'Machine wash gentle cold, hang dry', 
  'New', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'woolen-pompom-beanie-cap', 
  'Woolen Pompom Beanie Cap', 
  'વૂલન પોમપોમ બિની કેપ', 
  'winterwear', 
  'Woolen Caps', 
  'Features two fluffy faux-fur pompoms and foldover cuff to keep ears fully sheltered.', 
  249, 
  320, 
  '[{"size":"0-6M","stock":8},{"size":"6-12M","stock":6},{"size":"1-3Y","stock":5}]'::jsonb, 
  ARRAY['Mustard', 'Cream', 'Dusty Rose']::text[], 
  'Soft Stretch Woolen Knit with Cotton Inner Lining', 
  'Hand wash cold', 
  NULL, 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'terry-anti-slip-socks-pack', 
  'Thick Terry Anti-Slip Socks (Pack of 3)', 
  'થિક ટેરી એન્ટી-સ્લિપ મોજાં (૩ નું પેક)', 
  'winterwear', 
  'Socks', 
  'Non-skid silicone dot bottoms help learning walkers stay steady on tiled floors.', 
  299, 
  399, 
  '[{"size":"0-6M","stock":10},{"size":"6-12M","stock":8},{"size":"1-2Y","stock":6}]'::jsonb, 
  ARRAY['Pastel Woodland Trio']::text[], 
  'Cushioned Terry Cotton with Silicone Grip Soles', 
  'Machine wash warm, tumble dry', 
  'Pure Cotton', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'cable-knit-pullover-vest', 
  'Cable Knit Pullover Vest', 
  'કેબલ નીટ પુલઓવર વેસ્ટ', 
  'winterwear', 
  'Sweaters', 
  'Sleeveless sweater vest easily layers over any shirt or onesie for versatile warmth.', 
  549, 
  NULL, 
  '[{"size":"6-12M","stock":4},{"size":"1-2Y","stock":3},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Ecru Off-White', 'Navy Blue']::text[], 
  'Soft Cotton-Wool Blend', 
  'Hand wash cold', 
  NULL, 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'sherpa-fleece-reversible-gilet', 
  'Sherpa Fleece Reversible Jacket', 
  'શેરપા ફ્લીસ રિવર્સિબલ જેકેટ', 
  'winterwear', 
  'Jackets', 
  'Two looks in one jacket — cozy sherpa texture on one side, clean twill on reverse.', 
  799, 
  999, 
  '[{"size":"6-12M","stock":3},{"size":"1-2Y","stock":2},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Teddy Brown & Olive']::text[], 
  'Warm Sherpa Fleece & Twill', 
  'Machine wash delicate', 
  'Only few left', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'earflap-trapper-baby-cap', 
  'Earflap Trapper Baby Cap', 
  'ઈયરફ્લેપ ટ્રેપર બેબી કેપ', 
  'winterwear', 
  'Woolen Caps', 
  'Chin tie straps ensure the cap never falls off during chilly bike rides or strolls.', 
  299, 
  NULL, 
  '[{"size":"0-6M","stock":6},{"size":"6-12M","stock":4},{"size":"1-3Y","stock":2}]'::jsonb, 
  ARRAY['Heather Grey', 'Dusty Rose']::text[], 
  'Soft Acrylic with Cotton Fleece Ear Flaps', 
  'Hand wash gentle', 
  NULL, 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'merino-soft-knee-high-socks', 
  'Merino-Soft Knee High Socks (Pair of 2)', 
  'મેરિનો-સોફ્ટ ની-હાઈ મોજાં (૨ જોડી)', 
  'winterwear', 
  'Socks', 
  'Long knee-length socks stay up well under rompers and dresses.', 
  249, 
  NULL, 
  '[{"size":"0-6M","stock":8},{"size":"6-12M","stock":5},{"size":"1-2Y","stock":4}]'::jsonb, 
  ARRAY['Almond & Grey', 'Blush & White']::text[], 
  'Warm Breathable Cotton Wool Blend', 
  'Machine wash warm', 
  NULL, 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'minty-first-layer-sleepsuit', 
  'Minty First Layer Zip Sleepsuit', 
  'મિન્ટી બોડીસૂટ / સ્લીપસૂટ', 
  'sleepwear', 
  'Sleepsuits', 
  'Two-way zipper allows swift midnight diaper checks without stripping baby down completely.', 
  399, 
  499, 
  '[{"size":"0-3M","stock":6},{"size":"3-6M","stock":7},{"size":"6-12M","stock":5},{"size":"1-2Y","stock":3}]'::jsonb, 
  ARRAY['Mint Green', 'Soft Butter']::text[], 
  '100% Super-soft Interlock Cotton', 
  'Machine wash warm, tumble dry low', 
  'Best seller', 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'starry-night-pure-cotton-night-suit', 
  'Starry Night Pure Cotton Night Suit', 
  'સ્ટારી નાઇટ પ્યોર કૉટન નાઈટ સૂટ', 
  'sleepwear', 
  'Night Suits', 
  'Soft front button top with comfort-stretch pyjama pants for cozy slumber and evening lounging.', 
  549, 
  749, 
  '[{"size":"6-12M","stock":5},{"size":"1-2Y","stock":6},{"size":"2-3Y","stock":4}]'::jsonb, 
  ARRAY['Navy Constellation', 'Sky Moon']::text[], 
  '100% Breathable Combed Cotton Jersey', 
  'Machine wash inside out, medium iron', 
  'Pure Cotton', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'cloud-print-cuffed-sleepsuit', 
  'Cloud Print Cuffed Sleepsuit', 
  'ક્લાઉડ પ્રિન્ટ કફ્ડ સ્લીપસૂટ', 
  'sleepwear', 
  'Sleepsuits', 
  'Fold-over mitt cuffs on smaller sizes prevent accidental scratches during sleep.', 
  499, 
  650, 
  '[{"size":"0-3M","stock":4},{"size":"3-6M","stock":5},{"size":"6-12M","stock":3},{"size":"1-2Y","stock":1}]'::jsonb, 
  ARRAY['White with Blue Clouds', 'Lilac Clouds']::text[], 
  'Organic Cotton Knit', 
  'Wash cold, line dry', 
  'Only few left', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'pastel-animal-pajama-set', 
  'Pastel Safari Cotton Pajama Set', 
  'પેસ્ટલ સફારી કૉટન પાયજામા સેટ', 
  'sleepwear', 
  'Night Suits', 
  'Cute hand-drawn safari animals printed with gentle water-based baby safe inks.', 
  520, 
  NULL, 
  '[{"size":"6-12M","stock":6},{"size":"1-2Y","stock":5},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Safari Cream', 'Pale Sage']::text[], 
  '100% Bio-Wash Jersey', 
  'Machine wash warm', 
  'New', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'footie-cotton-sleepsuit', 
  'Full Footie Warm Cotton Sleepsuit', 
  'ફુલ ફુટી વૉર્મ કૉટન સ્લીપસૂટ', 
  'sleepwear', 
  'Sleepsuits', 
  'Built-in footies keep little toes snug without the need for separate socks that kick off.', 
  549, 
  NULL, 
  '[{"size":"0-3M","stock":5},{"size":"3-6M","stock":4},{"size":"6-12M","stock":2}]'::jsonb, 
  ARRAY['Heather Grey', 'Soft Rose']::text[], 
  'Interlock Heavy Cotton', 
  'Machine wash gentle', 
  NULL, 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'vintage-check-notched-collar-night-suit', 
  'Vintage Check Notched Collar Night Suit', 
  'વિન્ટેજ ચેક નોચ્ડ કોલર નાઈટ સૂટ', 
  'sleepwear', 
  'Night Suits', 
  'Timeless tailored notch collar nightwear with soft piping along lapels and pocket.', 
  599, 
  799, 
  '[{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":3}]'::jsonb, 
  ARRAY['Classic Pastel Blue Check', 'Pink Gingham']::text[], 
  '100% Cotton Poplin', 
  'Machine wash normal', 
  NULL, 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'sleeveless-summer-sleep-romper', 
  'Sleeveless Summer Sleep Romper (Pack of 2)', 
  'સ્લીવલેસ સમર સ્લીપ રોમ્પર (૨ નું પેક)', 
  'sleepwear', 
  'Sleepsuits', 
  'Ideal for hot Palanpur summers when a full onesie is too warm at bedtime.', 
  499, 
  NULL, 
  '[{"size":"0-3M","stock":6},{"size":"3-6M","stock":5},{"size":"6-12M","stock":4},{"size":"1-2Y","stock":3}]'::jsonb, 
  ARRAY['Sea Breeze & Lemon']::text[], 
  'Lightweight Cotton Rib', 
  'Machine wash warm', 
  NULL, 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'doodle-dream-unisex-pj-set', 
  'Doodle Dream Unisex PJ Set', 
  'ડૂડલ ડ્રીમ યુનિસેક્સ પીજે સેટ', 
  'sleepwear', 
  'Night Suits', 
  'Stretchy crewneck and ribbed ankle cuffs keep sleeves and trousers from riding up.', 
  480, 
  NULL, 
  '[{"size":"6-12M","stock":5},{"size":"1-2Y","stock":4},{"size":"2-3Y","stock":2}]'::jsonb, 
  ARRAY['Oatmeal Speckle']::text[], 
  '100% Organic Cotton', 
  'Gentle wash inside out', 
  NULL, 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'welcome-little-one-luxury-hamper', 
  'Welcome Little One Luxury Hamper (7 Pieces)', 
  'વેલકમ લિટલ વન લક્ઝરી હેમ્પર (૭ પીસ)', 
  'gifting', 
  'Hampers', 
  'Includes kimono onesie, swaddle, cap, mittens, booties, bib and keepsake wooden milestone card in a gift box.', 
  1199, 
  1599, 
  '[{"size":"NB","stock":4},{"size":"0-3M","stock":5}]'::jsonb, 
  ARRAY['Pastel Ivory Gift Box']::text[], 
  '100% Certified Organic Cotton', 
  'Individual items machine washable', 
  'Gift Pick', 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'organic-cotton-drool-bibs-pack', 
  'Waterproof Bandana Drool Bibs (Pack of 4)', 
  'વોટરપ્રૂફ બંદના ડ્રુલ બિબ્સ (૪ નું પેક)', 
  'gifting', 
  'Bibs', 
  'Absorbs teething drool instantly while keeping clothes dry with double nickel-free snaps.', 
  349, 
  450, 
  '[{"size":"Free Size","stock":14}]'::jsonb, 
  ARRAY['Earth Tones Quartet', 'Floral Bloom Quartet']::text[], 
  '100% Organic Cotton Top with Breathable Fleece Backing', 
  'Machine wash warm, air dry', 
  'Best seller', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'plush-cellular-baby-blanket', 
  'Plush Cellular Knitted Baby Blanket', 
  'પ્લશ સેલ્યુલર નીટેડ બેબી બ્લેન્કેટ', 
  'gifting', 
  'Blankets', 
  'Classic open-cell construction allows airflow while trapping comforting pockets of warmth.', 
  799, 
  1050, 
  '[{"size":"Free Size","stock":8}]'::jsonb, 
  ARRAY['Warm Cream', 'Dusty Rose', 'Soft Sage']::text[], 
  '100% Combed Cotton Cellular Knit', 
  'Machine wash cold on wool cycle, dry flat', 
  'Pure Cotton', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'first-year-milestone-gift-set', 
  'First Wardrobe Starter Gift Set (5 Pieces)', 
  'ફર્સ્ટ વોર્ડરોબ સ્ટાર્ટર ગિફ્ટ સેટ (૫ પીસ)', 
  'gifting', 
  'Gift sets', 
  'Contains a snap tee, matching footed pant, cap, bib and soft plush rattle toy beautifully boxed.', 
  899, 
  1199, 
  '[{"size":"0-3M","stock":6},{"size":"3-6M","stock":4}]'::jsonb, 
  ARRAY['Sunny Unisex Yellow', 'Pewter Mint']::text[], 
  '100% Cotton Interlock', 
  'Machine wash warm', 
  'Gift Pick', 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'reversible-feeding-bib-set', 
  'Reversible Feeding Bib Set (Pack of 3)', 
  'રિવર્સિબલ ફીડિંગ બિબ સેટ (૩ નું પેક)', 
  'gifting', 
  'Bibs', 
  'Wide coverage for messy purees and feeding times with soft velcro closure.', 
  299, 
  NULL, 
  '[{"size":"Free Size","stock":11}]'::jsonb, 
  ARRAY['Fruit Medley Prints']::text[], 
  'Double Layer Cotton with Terry Backing', 
  'Normal machine wash', 
  NULL, 
  ARRAY[]::text[], 
  '0% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'quilted-cot-bedding-dohar', 
  'Pure Mulmul Reversible Baby Dohar', 
  'પ્યોર મલમલ રિવર્સિબલ બેબી દોહર', 
  'gifting', 
  'Blankets', 
  'Ultra light Indian dohar filled with brushed cotton flannel layer for gentle all-season AC sleep.', 
  849, 
  1099, 
  '[{"size":"Free Size","stock":7}]'::jsonb, 
  ARRAY['Elephant Walk Blue', 'Peacock Garden Pink']::text[], 
  '3-Layer Traditional Jaipur Mulmul with Cotton Flannel Core', 
  'Gentle machine wash with mild soap', 
  'Best seller', 
  ARRAY[]::text[], 
  '100% 0%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'newborn-arrival-hospital-kit', 
  'Hospital Bag Newborn Essentials Kit', 
  'હોસ્પિટલ બેગ નવજાત એસેન્શિયલ્સ કિટ', 
  'gifting', 
  'Hampers', 
  'Pre-washed in non-toxic water so parents can pack directly into delivery hospital bags.', 
  949, 
  1250, 
  '[{"size":"NB","stock":5},{"size":"0-3M","stock":3}]'::jsonb, 
  ARRAY['White Pure Care']::text[], 
  '100% Pre-washed Organic Cotton', 
  'Pre-washed, ready to wear directly', 
  'Only few left', 
  ARRAY[]::text[], 
  '0% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
  slug, name, name_gu, collection, subcategory, description, price, old_price, 
  sizes, colours, fabric, care, tag, images, image_crop, status, featured
) VALUES (
  'toddler-snack-bib-teether-combo', 
  'Toddler Snack Bib & Teether Combo', 
  'ટોડલર સ્નેક બિબ અને ટીથર કોમ્બો', 
  'gifting', 
  'Gift sets', 
  'Includes catch-all crumb bib and natural neem/beech wood teething ring.', 
  449, 
  NULL, 
  '[{"size":"Free Size","stock":9}]'::jsonb, 
  ARRAY['Sage Green & Wood', 'Peach & Wood']::text[], 
  'Food Grade Silicone + Beech Wood + Organic Cotton', 
  'Wipe clean / hand wash cloth', 
  NULL, 
  ARRAY[]::text[], 
  '100% 100%', 
  'published', 
  false
) ON CONFLICT (slug) DO NOTHING;