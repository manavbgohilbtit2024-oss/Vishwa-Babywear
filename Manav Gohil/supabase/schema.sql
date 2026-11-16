-- Vishwa Babywear — Supabase Schema
-- Run this in your Supabase SQL editor: https://supabase.com/dashboard → SQL Editor
-- Assumes auth.users is managed by Supabase Auth.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  phone       text,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row when a user signs up (uses metadata from signup)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. ADDRESSES
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  label       text not null default 'Home',
  full_name   text not null,
  phone       text not null,
  line1       text not null,
  area        text not null,
  city        text not null default 'Palanpur',
  state       text not null default 'Gujarat',
  pincode     text not null,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. FAVORITES
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.favorites (
  user_id      uuid not null references auth.users on delete cascade,
  product_id   text not null,
  created_at   timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- In case table was previously created with product_slug:
alter table public.favorites add column if not exists product_id text;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. CART ITEMS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.cart_items (
  user_id      uuid not null references auth.users on delete cascade,
  product_id   text not null,
  size         text not null,
  quantity     int  not null default 1 check (quantity > 0),
  updated_at   timestamptz not null default now(),
  primary key (user_id, product_id, size)
);

-- In case table was previously created with product_slug:
alter table public.cart_items add column if not exists product_id text;

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. ORDERS
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id             text primary key,                                  -- e.g. VBW-261010-4521
  user_id        uuid references auth.users on delete set null,    -- null for guest orders
  data           jsonb not null,                                    -- full Order object
  total          numeric(10,2) not null,
  payment_method text not null,
  payment_status text not null,
  created_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.profiles   enable row level security;
alter table public.addresses  enable row level security;
alter table public.favorites  enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders     enable row level security;

-- profiles
drop policy if exists "profiles: own row only" on public.profiles;
create policy "profiles: own row only"
  on public.profiles for all
  using (id = auth.uid())
  with check (id = auth.uid());

-- addresses
drop policy if exists "addresses: own rows only" on public.addresses;
create policy "addresses: own rows only"
  on public.addresses for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- favorites
drop policy if exists "favorites: own rows only" on public.favorites;
create policy "favorites: own rows only"
  on public.favorites for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- cart_items
drop policy if exists "cart_items: own rows only" on public.cart_items;
create policy "cart_items: own rows only"
  on public.cart_items for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- orders: users can read their own orders; insert allowed for authenticated users.
drop policy if exists "orders: own rows select" on public.orders;
create policy "orders: own rows select"
  on public.orders for select
  using (user_id = auth.uid());

drop policy if exists "orders: insert own" on public.orders;
create policy "orders: insert own"
  on public.orders for insert
  with check (user_id = auth.uid() or user_id is null);

-- ─────────────────────────────────────────────────────────────────────────────
-- NOTE: Never store card numbers, CVV or any payment instrument details.
-- The orders table stores only the payment method label and status.
-- ─────────────────────────────────────────────────────────────────────────────
