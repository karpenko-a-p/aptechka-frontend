'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useService } from 'presentation/hooks/useService';
import { COUNTER_STORE } from 'application/abstractions/stores';

export const Counter = observer(() => {
  const { getCount, increment, decrement } = useService(COUNTER_STORE);

  return (
    <div className="flex gap-4 items-center">
      <button type="button" onClick={decrement}>Уменьшить</button>
      <p className="w-[200px] text-center">{getCount()}</p>
      <button type="button" onClick={increment}>Увеличить</button>
    </div>
  );
});