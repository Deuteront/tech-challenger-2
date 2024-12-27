import React from 'react';
import { props } from '@/components/atoms/button/button.type';
import './style.scss';
import Image from 'next/image';

export function Button({ onClick, text, className, icon }: props) {
  function removeIconExtension(iconName: string): string {
    return iconName.replace(/\.[^/.]+$/, '');
  }

  return (
    <button className={className.join(' ')} onClick={onClick}>
      {icon ? (
        <Image
          src={`/svgs/${icon}`}
          alt={removeIconExtension(icon)}
          width={24}
          height={24}
        />
      ) : (
        ''
      )}
      {text ? text : ''}
    </button>
  );
}
