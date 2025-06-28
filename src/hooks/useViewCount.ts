
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useViewCount = (pagePath: string) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const incrementAndGetViewCount = async () => {
      try {
        // Call the increment function
        const { data, error } = await supabase.rpc('increment_page_views', {
          page_path: pagePath
        });

        if (error) {
          console.error('Error incrementing view count:', error);
          return;
        }

        setViewCount(data || 0);
      } catch (error) {
        console.error('Error with view count:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementAndGetViewCount();
  }, [pagePath]);

  return { viewCount, loading };
};
