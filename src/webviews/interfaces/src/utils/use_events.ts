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
  keepEvent: boolean = false
): useEventsReturn {
  const [loading, setLoading] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<IResponseData>({
    content: null,
    statusCode: null,
    error: null,
  });

  if (keepEvent)
    // @ts-ignore
    return window.alt.on(`response:${eventName}`, (data: IResponseData) =>
      setResponseData(data)
    );

  function loadingHandler(state: boolean) {
    return setLoading(state);
  }

  function fetchData(requestData: unknown) {
    // @ts-ignore
    if (!window.alt) {
      console.error('Não foi possível identificar o objeto alt');
      return () => {};
    }

    setLoading(true);
    const eventFunction = (data: IResponseData) => {
      setResponseData(data);
      setLoading(false);
    };

    // @ts-ignore
    window.alt.once(`response:${eventName}`, eventFunction);
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
