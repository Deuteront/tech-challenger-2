import React from 'react';
import { Props } from '@/components/atoms/button/button.interface';
import Image from 'next/image';

export function Button({
  onClick,
  className,
  icon,
  disabled,
  children,
}: Props) {
  function removeIconExtension(iconName: string): string {
    return iconName.replace(/\.[^/.]+$/, '');
  }

  return (
    <button
      className={className.join(' ') + (disabled ? ' disabled-button' : '')}
      onClick={onClick}
      disabled={disabled}
    >
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
      {children ? children : ''}
    </button>
  );
}
