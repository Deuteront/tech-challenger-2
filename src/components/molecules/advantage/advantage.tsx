import React from 'react';
import './style.scss';
import Image from 'next/image';
import { props } from '@/components/molecules/advantage/advantage.type';

export function Advantage({ image, text, icon }: props) {
  return (
    <div className="advantage">
      <div className="icon">
        <Image src={`/svgs/${icon}.svg`} alt={icon} width="72" height="72" />
      </div>
      <span className="text">{text}</span>
      <div className="image">
        <Image src={`/svgs/${image}.svg`} alt={image} layout="fill" />
      </div>
    </div>
  );
}
