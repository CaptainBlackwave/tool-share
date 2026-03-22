'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

function AnalyticsContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = window.location.pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    if (process.env.NODE_ENV === 'production') {
      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (gaId) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', gaId, {
          page_path: url,
        });
      }
    }
  }, [searchParams]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
