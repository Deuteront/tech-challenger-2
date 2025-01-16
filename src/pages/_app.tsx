import { AuthProvider } from '@/context/auth-context';
import { AppProps } from 'next/app';
import './global.scss';
import { QueryProvider } from '@/components/organisms/providers/query-provider';
import React from 'react';

function MyApp({Component, pageProps}: AppProps) {
  return (

    <QueryProvider>
      <AuthProvider>
        <Component {...pageProps} /></AuthProvider>
    </QueryProvider>
  );
}

export default MyApp;
