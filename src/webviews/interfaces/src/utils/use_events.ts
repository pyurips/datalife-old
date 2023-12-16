import { useState } from 'react';

function useEvents(emitTo: 'client' | 'server', eventName: string) {
  // @ts-ignore
  if (!window.alt) throw new Error('Não foi possível identificar o objeto alt');

  const [loading, setLoading] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<unknown>(null);

  function fetchData(requestData: unknown): Promise<void> {
    setLoading(true);
    return new Promise((resolve) => {
      const eventFunction = (data: unknown) => {
        setResponseData(data);
        resolve();
        // @ts-ignore
        window.alt.off(`response:${eventName}`, eventFunction);
        setLoading(false);
      };

      // @ts-ignore
      window.alt.on(`response:${eventName}`, eventFunction);
      // @ts-ignore
      window.alt.emit('emitTo', emitTo, `request:${eventName}`, requestData);
    });
  }

  return {
    loading,
    responseData,
    fetchData,
  };
}

export default useEvents;
