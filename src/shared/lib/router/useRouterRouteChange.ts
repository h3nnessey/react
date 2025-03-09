import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useRouterRouteChange = () => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsFetching(true);
    };

    const handleRouteChangeEnd = () => {
      setIsFetching(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
    };
  }, [router]);

  return { isFetching, router };
};
