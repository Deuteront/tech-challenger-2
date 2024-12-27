import React from 'react';
import './style.scss';

export function Welcome() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <span className="title">Bem-vindo(a)!</span>
          <span className="subtitle">
            Aqui você pode gerenciar suas finanças de forma simples e fácil.
          </span>
        </div>
      </div>
    </div>
  );
}
