import React from 'react';
import Image from 'next/image';
import { Props } from '@/components/molecules/advantage/advantage.interface';

export function Advantage({ image, text, icon }: Props) {
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
