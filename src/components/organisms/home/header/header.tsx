'use client';

import React from 'react';
import { Logo } from '@/components/organisms/logo/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  loginOut?: () => void;
  isAuth?: boolean;
}

export function Header({ isAuth, loginOut }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="header">
      <div className="container">
        <div className="row w-100">
          <div className="col-12 container-header">
            <Link href="/dashboard">
              <Logo />
            </Link>
            {isAuth && (
              <div className="menu-container">
                <Link
                  href="/dashboard"
                  className={`menu-item ${isActive('/dashboard') ? 'activate' : ''}`}
                >
                  Transferências
                </Link>
                <Link
                  href="/dashboard/investments"
                  className={`menu-item ${isActive('/dashboard/investments') ? 'activate' : ''}`}
                >
                  Investimentos
                </Link>
                <Link
                  href="/dashboard/other-services"
                  className={`menu-item ${isActive('/dashboard/other-services') ? 'activate' : ''}`}
                >
                  Outros serviços
                </Link>
              </div>
            )}
            {isAuth && (
              <span onClick={loginOut} className="logout">
                Sair
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
