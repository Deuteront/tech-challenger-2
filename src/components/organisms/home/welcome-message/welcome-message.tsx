import React from 'react';
import './style.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getFromStorage } from '@/utils/storage';

dayjs.extend(localizedFormat);
dayjs.locale('pt-br');

export function WelcomeMessage() {
  // const username = getFromStorage('username') as string;
  return (
    <div className="welcome">
      <span className="title">Olá, a</span>
      <div className="date">{dayjs().format('dddd, DD/MM/YYYY')}</div>
    </div>
  );
}
