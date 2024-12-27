import { ReactNode } from 'react';

export type Props = {
  onClick: () => void;
  className: string[];
  icon?: string;
  disabled?: boolean;
  children?: ReactNode;
} & (
  | { icon: string; children?: ReactNode }
  | { icon?: never; children: ReactNode }
);
