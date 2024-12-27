'use client';

import React from 'react';

import './style.scss';
import { Header } from '@/components/organisms/landing-page/header/header';
import { Body } from '@/components/organisms/landing-page/body/body';
import { Footer } from '@/components/organisms/landing-page/footer/footer';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;
