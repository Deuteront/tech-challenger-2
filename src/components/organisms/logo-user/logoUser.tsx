import Image from 'next/image';
import React from 'react';

export function LogoUser() {
  const logo = '/svgs/icon_user.svg';

  return (
    <div className="logo">
      <Image src={logo} width="27" height="27" alt="icon"/>
    </div>
  );
}
