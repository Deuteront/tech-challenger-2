import React from 'react';

import { AuthProvider } from '@/context/auth-context';
import { QueryProvider } from '@/components/organisms/providers/query-provider';

export const metadata = {
  title: 'Meow Cash',
  description: 'Controle suas finanças de forma simples e eficiente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
