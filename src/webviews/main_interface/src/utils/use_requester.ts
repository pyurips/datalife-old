import { useState } from 'react';

function useRequester(
  to: 'server' | 'client',
  operation: string,
  startLoading: boolean
) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [data, setData] = useState<any>();

  function fetch(requestData?: unknown) {
    setLoading(true);
    if (!window.alt) {
      console.error('Não foi encontrado o método alt no objeto Window');
      return setLoading(false);
    }

    window.alt.once(`response:${operation}`, (response: any) => {
      setData(response);
      return setLoading(false);
    });
    return window.alt.emit('request', to, operation, requestData);
  }

  return {
    data,
    fetch,
    loading,
  };
}

export default useRequester;
