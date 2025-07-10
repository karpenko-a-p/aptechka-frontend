'use client';

import { usePayload } from 'presentation/providers/PayloadProvider';
import { FC } from 'react';

export const PayloadConsumer: FC = () => {
  const payload = usePayload<string[]>();

  return (
    <p className="mt-2">
      Полученно элеентов из серверного компонента: <i>{payload.length}</i>
    </p>
  );
};
