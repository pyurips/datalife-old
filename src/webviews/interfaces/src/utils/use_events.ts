import { useState } from 'react';

async function useEvents(eventType: 'client' | 'server', eventName: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<unknown>(null);

  // @ts-ignore
  if (!window.alt) throw new Error('Não foi possível identificar o objeto alt');

  const fetch = async (data: unknown) => {
    setLoading(true);
    // @ts-ignore
    window.alt.emit('emitTo', eventType, `request:${eventName}`, data);
    const response = await new Promise((resolve) => {
      // @ts-ignore
      window.alt.on(`response:${eventName}`, (responseData) =>
        resolve(responseData)
      );
    });
    setData(response);
    setLoading(false);
  };

  return {
    loading,
    data,
    fetch,
  };
}

export default useEvents;
