import React from 'react';
import './style.scss';
import { Logo } from '@/components/organisms/logo/logo';

export function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}
