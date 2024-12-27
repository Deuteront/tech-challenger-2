import React from 'react';
import './style.scss';
import { Welcome } from '@/components/organisms/dashboard/body/welcome/welcome';
import { Transitions } from '@/components/organisms/dashboard/body/transitions/transitions';

export function Body() {
  return (
    <div className="body-dashboard">
      <Welcome />
      <Transitions />
    </div>
  );
}
