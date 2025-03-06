'use client';
import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { processSearchParams } from '@/shared/lib/url';
import {
  SearchNavigationContext,
  type NavigateParams,
} from '../lib/SearchNavigationContext';

const SearchNavigationProviderInner = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('name') || '';
  const currentPage = searchParams.get('page') || '1';

  const navigate = ({
    name = '',
    page = '1',
    preserveParams = false,
  }: NavigateParams) => {
    const newSearchParams = processSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...(preserveParams ? {} : { name: name || search, page }),
    });

    setIsLoading(true);
    router.push(`/?${newSearchParams}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  return (
    <SearchNavigationContext.Provider
      value={{ search, page: Number(currentPage), isLoading, navigate }}
    >
      {children}
    </SearchNavigationContext.Provider>
  );
};

export const SearchNavigationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Suspense>
      <SearchNavigationProviderInner>{children}</SearchNavigationProviderInner>
    </Suspense>
  );
};
