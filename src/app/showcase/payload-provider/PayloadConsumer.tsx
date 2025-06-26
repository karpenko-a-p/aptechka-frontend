'use client';

import { usePayload } from 'presentation/providers/PayloadProvider';

export const PayloadConsumer = () => {
  const payload = usePayload<string[]>();

  return (
    <p className="mt-2">
      Полученно элеентов из серверного компонента: <i>{payload.length}</i>
    </p>
  );
};
