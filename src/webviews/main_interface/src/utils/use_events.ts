import { useState } from 'react';

type IResponseData = {
  content: any | null;
  statusCode: number | null;
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
  onlyEmit: boolean = false
): useEventsReturn {
  const [loading, setLoading] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<IResponseData>({
    content: null,
    statusCode: null,
    error: null,
  });

  function loadingHandler(state: boolean) {
    return setLoading(state);
  }

  function fetchData(requestData: unknown) {
    if (!window.alt) {
      console.error('Não foi possível identificar o objeto alt');
      return () => {};
    }

    setLoading(true);
    const eventFunction = (data: IResponseData) => {
      setResponseData(data);
      setLoading(false);
    };

    if (!onlyEmit) window.alt.once(`response:${eventName}`, eventFunction);
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
