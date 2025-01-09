import React from 'react';
import './style.scss';
import { Logo } from '@/components/organisms/logo/logo';
import Link from 'next/link';

interface Props {
  loginOut?: () => void;
  isAuth?: boolean;
}

export function Header({ isAuth, loginOut }: Props) {
  return (
    <div className="header">
      <div className="container">
        <div className="row w-100">
          <div className="col-12 container-header">
            <Link href="/">
              <Logo />
            </Link>
            {isAuth && (
              <div className={'menu-container'}>
                <Link href="/dashboard" className={'menu-item'}>
                  Transferências
                </Link>
                <Link href="/dashboard/investments" className={'menu-item'}>
                  Investimentos
                </Link>
                <Link href="/dashboard/other-services" className={'menu-item'}>
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
