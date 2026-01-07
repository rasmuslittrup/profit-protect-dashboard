-- Create shipping_rules table
CREATE TABLE public.shipping_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rule_type TEXT NOT NULL, -- 'Kategori', 'Brand', 'Produkt-tag'
  target_value TEXT NOT NULL, -- 'Sko', 'Nike', 'Outlet'
  estimated_margin_percent INTEGER NOT NULL DEFAULT 0,
  action TEXT NOT NULL DEFAULT 'Fri Fragt', -- 'Fri Fragt', 'Nedsat Fragt'
  is_active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shop_settings table
CREATE TABLE public.shop_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  control_group_percent INTEGER NOT NULL DEFAULT 20,
  min_profit_threshold NUMERIC NOT NULL DEFAULT 75,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversion_events table
CREATE TABLE public.conversion_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'popup_shown', 'converted', 'control_group'
  cart_value NUMERIC,
  shipping_cost_saved NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.shipping_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shipping_rules
CREATE POLICY "Users can view their own shipping rules" 
ON public.shipping_rules FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shipping rules" 
ON public.shipping_rules FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shipping rules" 
ON public.shipping_rules FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shipping rules" 
ON public.shipping_rules FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for shop_settings
CREATE POLICY "Users can view their own shop settings" 
ON public.shop_settings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own shop settings" 
ON public.shop_settings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shop settings" 
ON public.shop_settings FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for conversion_events
CREATE POLICY "Users can view their own conversion events" 
ON public.conversion_events FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversion events" 
ON public.conversion_events FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_shipping_rules_updated_at
BEFORE UPDATE ON public.shipping_rules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_shop_settings_updated_at
BEFORE UPDATE ON public.shop_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();