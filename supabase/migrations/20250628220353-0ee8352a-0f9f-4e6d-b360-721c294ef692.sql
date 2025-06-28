
-- Create a table to store view counts for different pages
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial record for Pascal's Triangle page
INSERT INTO public.page_views (page_path, view_count) 
VALUES ('/', 1247);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION public.increment_page_views(page_path TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO public.page_views (page_path, view_count, updated_at)
  VALUES (page_path, 1, now())
  ON CONFLICT (page_path) 
  DO UPDATE SET 
    view_count = page_views.view_count + 1,
    updated_at = now()
  RETURNING view_count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Make the table readable by anyone (since it's just view counts)
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page views" 
  ON public.page_views 
  FOR SELECT 
  USING (true);

-- Allow the increment function to work
CREATE POLICY "Allow increment function to update views" 
  ON public.page_views 
  FOR ALL 
  USING (true);
