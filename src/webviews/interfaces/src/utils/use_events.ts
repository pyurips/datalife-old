import { useState } from 'react';

type IResponseData = {
  content: unknown;
  statusCode: number;
  error: {
    message: string;
    internalCode: string;
  } | null;
};

type useEventsReturn = {
  loading: boolean;
  responseData: IResponseData;
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
  const [responseData, setResponseData] = useState<IResponseData>({
    content: null,
    statusCode: 500,
    error: null,
  });

  if (responseOnly)
    // @ts-ignore
    return window.alt.on(`response:${eventName}`, (data: IResponseData) =>
      setResponseData(data)
    );

  function loadingHandler(state: boolean) {
    return setLoading(state);
  }

  function fetchData(requestData: unknown) {
    setLoading(true);
    const eventFunction = (data: IResponseData) => {
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
