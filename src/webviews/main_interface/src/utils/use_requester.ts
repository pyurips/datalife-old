import { useState } from 'react';

type IResponse = {
  data: unknown;
  status: number;
  error: { message: string; internalCode: number };
};

export function useRequester(emitTo: 'client' | 'server', eventName: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<IResponse>();

  function loadingHandler(state: boolean) {
    return setLoading(state);
  }

  function fetchData(data: unknown) {
    if (!window.alt)
      return console.error('Não foi possível identificar o objeto alt');
    setLoading(true);
    const eventHandler = (response: IResponse) => {
      setResponse(response);
      setLoading(false);
    };
    window.alt.once(`response:${eventName}`, eventHandler);
    window.alt.emit('emitTo', emitTo, `request:${eventName}`, data);
  }

  return {
    loading,
    response,
    fetchData,
    loadingHandler,
  };
}
