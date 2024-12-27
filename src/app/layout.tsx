import React from 'react';

import './global.scss';

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
      <body>{children}</body>
    </html>
  );
}
