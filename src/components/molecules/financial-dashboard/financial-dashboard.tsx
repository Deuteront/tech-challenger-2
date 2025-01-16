import React from 'react';
import Image from 'next/image';
import { props } from '@/components/molecules/financial-dashboard/financial-dashboard.type';

export function FinancialDashboard({
  textTitle,
  textValue,
  financialHistory,
  icon,
}: props) {
  return (
    <div className="financialDashboard">
      <div className="icon">
        <Image src={`/svgs/${icon}.svg`} alt={icon} width="62" height="62" />
      </div>
      <div className="context-card-Dashboard">
        <span className="text-card-Dashboard">{textTitle}</span>
        <span className="value-card-dashboard">{'R$ ' + textValue}</span>
        {financialHistory && (
          <span className="desc-card-dashboard">{financialHistory}</span>
        )}
      </div>
    </div>
  );
}
