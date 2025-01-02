import React from 'react';
import './style.scss';
import { Logo } from '@/components/organisms/logo/logo';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { isAuth, loginOut } = useAuth();
  return (
    <div className="header">
      <div className="container">
        <div className="row w-100">
          <div className="col-12 container-header">
            <Logo />
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
