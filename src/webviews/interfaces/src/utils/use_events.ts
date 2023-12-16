import { useState } from 'react';

type useEventsReturn = {
  loading: boolean;
  responseData: unknown;
  fetchData: (requestData: unknown) => void;
  loadingHandler: (state: boolean) => void;
};

function useEvents(
  emitTo: 'client' | 'server',
  eventName: string,
  responseOnly: boolean = false
): useEventsReturn {
  // @ts-ignore
  if (!window.alt) throw new Error('Não foi possível identificar o objeto alt');

  const [loading, setLoading] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<unknown>(null);

  if (responseOnly)
    // @ts-ignore
    return window.alt.on(`response:${eventName}`, (data: unknown) =>
      setResponseData(data)
    );

  function loadingHandler(state: boolean) {
    return setLoading(state);
  }

  function fetchData(requestData: unknown) {
    setLoading(true);
    const eventFunction = (data: unknown) => {
      setResponseData(data);
      // @ts-ignore
      window.alt.off(`response:${eventName}`, eventFunction);
      setLoading(false);
    };

    // @ts-ignore
    window.alt.on(`response:${eventName}`, eventFunction);
    // @ts-ignore
    window.alt.emit('emitTo', emitTo, `request:${eventName}`, requestData);
  }

  return {
    loading,
    responseData,
    fetchData,
    loadingHandler,
  };
}

export default useEvents;
