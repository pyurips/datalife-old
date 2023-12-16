import { useState } from 'react';

async function useEventsHook(
  type: 'client' | 'server',
  eventName: string,
  onlyRes: boolean,
  onlyResCallback: (data: any) => void
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  // @ts-ignore
  if (!window.alt) throw new Error('Não foi possível identificar o objeto alt');
  // @ts-ignore
  if (onlyRes) return window.alt.on(eventName, onlyResCallback);


}

export default useEventsHook;
