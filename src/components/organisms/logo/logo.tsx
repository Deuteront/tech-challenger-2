import Image from 'next/image';
import React from 'react';
import './style.scss';

type props = { color?: 'white' };

export function Logo({ color }: props) {
  const logos = {
    white: {
      icon: '/svgs/meow_cash_icon_white.svg',
      text: '/svgs/meow_cash_text_white.svg',
    },
    pink: {
      icon: '/svgs/meow_cash_icon.svg',
      text: '/svgs/meow_cash_text.svg',
    },
  };
  const { icon, text } = color === 'white' ? logos.white : logos.pink;
  return (
    <div className="logo">
      <Image src={icon} width="17" height="17" alt="icon" />
      <Image src={text} width="106" height="30" alt="icon" />
    </div>
  );
}
