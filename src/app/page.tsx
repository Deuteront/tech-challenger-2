'use client';

import React from 'react';

import './style.scss';
import { Body } from '@/components/organisms/landing-page/body/body';
import { Footer } from '@/components/organisms/landing-page/footer/footer';
import { Header } from '@/components/organisms/home/header/header';

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
