import React from 'react';
import { Logo } from '@/components/organisms/logo/logo';
import { LogoUser } from '@/components/organisms/logo-user/logoUser';

export function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="col-12 row-itens">
          <div className="menu">
            <Logo />
          </div>
          <div className="menu-options">
            <p>Inicio</p>
            <p>Extrato</p>
          </div>
          <div>
            <LogoUser />
          </div>
        </div>
      </div>
    </div>
  );
}
