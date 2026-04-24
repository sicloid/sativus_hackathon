-- PetVerse (Magaza Modülü) Initial Schema

-- 1. Tabloların Oluşturulması
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_percentage INTEGER CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  is_from_seller BOOLEAN DEFAULT FALSE,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS (Row Level Security) Ayarları
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Products: Herkes okuyabilir, adminler yazabilir (Şimdilik admin kuralı eklenmedi)
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

-- Favorites: Kullanıcılar sadece kendi favorilerini görebilir ve değiştirebilir
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Orders: Kullanıcılar kendi siparişlerini görebilir
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: Kullanıcılar kendi sipariş detaylarını görebilir
CREATE POLICY "Users can view their order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid()
    )
  );
CREATE POLICY "Users can create order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid()
    )
  );

-- Messages: Kullanıcılar sadece kendi mesajlarını görebilir
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = user_id AND is_from_seller = FALSE);

-- Mock Data Ekleme
INSERT INTO public.products (name, description, price, category, stock_quantity, image_url) VALUES
('Premium Köpek Maması 15kg', 'Yetişkin köpekler için somonlu, tahılsız.', 1250.00, 'Köpek', 45, 'https://placehold.co/400x400/fca5a5/000000?text=Kopek+Mamasi'),
('Kedi Kumu İnce Taneli 10L', 'Ekstra topaklaşan, parfümlü kedi kumu.', 180.00, 'Kedi', 120, 'https://placehold.co/400x400/93c5fd/000000?text=Kedi+Kumu');
