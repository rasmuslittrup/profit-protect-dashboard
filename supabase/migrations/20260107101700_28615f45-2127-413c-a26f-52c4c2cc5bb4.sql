-- Add shop_domain column to shop_settings
ALTER TABLE public.shop_settings 
ADD COLUMN shop_domain TEXT;