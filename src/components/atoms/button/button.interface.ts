import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className: string[];
  icon?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface PropsWithIcon {
  icon: string;
  children?: React.ReactNode;
}

interface PropsWithoutIcon {
  icon?: never;
  children: React.ReactNode;
}

export type Props = ButtonProps & (PropsWithIcon | PropsWithoutIcon);
