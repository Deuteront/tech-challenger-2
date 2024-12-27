import React from 'react';
import { propsAdvantageList } from '@/components/molecules/advantage/advantage.type';
import { Advantage } from '@/components/molecules/advantage/advantage';

export function AdvantageList({ advantage, className }: propsAdvantageList) {
  return (
    <div className={className}>
      {advantage.map((item, index) => (
        <Advantage key={index} {...item} />
      ))}
    </div>
  );
}
