import React from 'react';
import { Logo } from '@/components/organisms/logo/logo';
import Image from 'next/image';
import { Button } from '@/components/atoms/button/button';

export function Footer() {
  return (
    <div className="footer">
      <div className="footer-background">
        <div className="container">
          <div className="row">
            <div className="col-12 footer-about">
              <div className="footer-container">
                <Logo color="white" />
                <div className="social-media">
                  <Image
                    src="svgs/insta.svg"
                    alt="insta"
                    height="40"
                    width="40"
                  />
                  <Image
                    src="svgs/phone.svg"
                    alt="phone"
                    height="40"
                    width="40"
                  />
                </div>
              </div>
              <div className="footer-container">
                <span className="title">Contato</span>
                <span className="info">0800 4002 8922</span>
                <span className="info">meajuda@meowcash.com.br</span>
                <span className="info">ouvidoria@meowcash.com.br</span>
              </div>
              <div className="footer-container">
                <span className="title">Geral</span>
                <span className="info">Sobre</span>
                <span className="info">Preços</span>
              </div>
              <div className="footer-container">
                <span className="title">ASSINE NOSSA NEWSLETTER</span>
                <span className="info">
                  Receba conteúdos exclusivos, preparados para o seu negócio.
                </span>
                <div className="container-input">
                  <input className="input" placeholder="E-mail" />
                </div>
                <Button
                  onClick={() => console.log('SEND!!!!!!')}
                  className={['send-button', 'button']}
                >
                  Enviar
                </Button>
                <span className="info-mirror">
                  Ao cadastrar-se você autoriza a Meowcash a enviar conteúdos
                  informativos e publicitários, nos termos da nossa Política de
                  Privacidade.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <span>
          © Copyright 2024 FIAP. Todos os direitos reservados. - CNPJ
          12.345.678/0001-99 - São Paulo/SP
        </span>
      </div>
    </div>
  );
}
