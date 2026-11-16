-- Admin Tables & Functions

-- 1. admin_users
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users on delete cascade
);

alter table public.admin_users enable row level security;
drop policy if exists "admin_users: select own" on public.admin_users;
create policy "admin_users: select own"
  on public.admin_users for select
  using (user_id = auth.uid());
-- No insert/update/delete policies. Only managed via Supabase SQL dashboard.

-- Example to add admin:
-- insert into public.admin_users (user_id) select id from auth.users where email = 'OWNER_EMAIL_HERE';

-- 2. is_admin() function
create or replace function public.is_admin()
returns boolean
language sql
security definer stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

-- 3. products
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  name_gu text,
  collection text not null check (collection in ('newborn', 'boys', 'girls', 'winterwear', 'sleepwear', 'gifting')),
  subcategory text not null,
  description text,
  price integer not null,
  old_price integer,
  sizes jsonb not null default '[]'::jsonb, -- array of {size, stock}
  colours text[] not null default '{}',
  fabric text,
  care text,
  tag text,
  images text[] not null default '{}',
  image_crop text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users
);

alter table public.products enable row level security;

drop policy if exists "products: public select published" on public.products;
create policy "products: public select published"
  on public.products for select
  using (status = 'published' or public.is_admin());

drop policy if exists "products: admin all" on public.products;
create policy "products: admin all"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- 4. store_settings
create table if not exists public.store_settings (
  id integer primary key default 1 check (id = 1),
  delivery_fee integer not null default 60,
  free_delivery_threshold integer not null default 999,
  banner_en text,
  banner_gu text,
  banner_enabled boolean not null default false,
  hours_text text,
  hours_confirmed boolean not null default false
);

alter table public.store_settings enable row level security;

drop policy if exists "store_settings: public select" on public.store_settings;
create policy "store_settings: public select"
  on public.store_settings for select
  using (true);

drop policy if exists "store_settings: admin all" on public.store_settings;
create policy "store_settings: admin all"
  on public.store_settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- Insert default settings
insert into public.store_settings (id, delivery_fee, free_delivery_threshold, hours_text, hours_confirmed)
values (1, 60, 999, 'Mon – Sun: 10:30 am – 8:30 pm', false)
on conflict (id) do nothing;

-- 5. Storage Bucket (Run via dashboard if needed, or using SQL api)
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product-images: public read" on storage.objects;
create policy "product-images: public read"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "product-images: admin all" on storage.objects;
create policy "product-images: admin all"
  on storage.objects for all
  using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());
