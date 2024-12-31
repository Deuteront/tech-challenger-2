import React from 'react';
import { PropsAdvantageList } from '@/components/molecules/advantage/advantage.interface';
import { Advantage } from '@/components/molecules/advantage/advantage';

export function AdvantageList({ advantage, className }: PropsAdvantageList) {
  return (
    <div className={className}>
      {advantage.map((item, index) => (
        <Advantage key={index} {...item} />
      ))}
    </div>
  );
}
