import React from 'react';
import './style.scss';
import { Button } from '@/components/atoms/button/button';
import Image from 'next/image';
import { AdvantageList } from '@/components/molecules/advantage/advantage-list';
import { useRouter } from 'next/navigation';

export function Body() {
  const router = useRouter();
  const handleDashboard = () => router.push('/dashboard');
  const advantages = [
    {
      text: 'Relatórios e análises em tempo real',
      icon: 'graph',
      image: 'graph2',
    },
    {
      text: 'Gerencie suas finanças sem complicações',
      icon: 'pig',
      image: 'pig2',
    },
    {
      text: 'Notificações para não deixar passar nada',
      icon: 'ad',
      image: 'ad2',
    },
  ];

  return (
    <div className="body">
      <div className="initial-scream">
        <div className="container-invite">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="invite">
                  <span className="title">
                    Controle suas finanças na palma da sua pata.
                  </span>
                  <Button
                    onClick={handleDashboard}
                    className={['button', 'primary-button']}
                    text="Começar agora"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave">
          <div className="cat-paw">
            <Image src="/png/cat.png" alt="cat-paw" width="377" height="482" />
          </div>
          <div className="wave-login">
            <span className="has-login">Vamos Começar?</span>
            <a href="/dashboard" className="login">
              Iniciar
            </a>
          </div>
        </div>
      </div>
      {<AdvantageList advantage={advantages} className="advantage-list" />}
    </div>
  );
}
