import React from 'react';

export type props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string[];
};
