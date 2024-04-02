import { useState } from 'react';

function useRequester(operationName: string, startLoading: boolean) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [data, setData] = useState<any>();

  function fetch(requestData?: unknown) {
    setLoading(true);
    if (!window.alt) {
      console.error('Não foi encontrado o método alt no objeto Window');
      return setLoading(false);
    }

    window.alt.once(`response:${operationName}`, (responseData: any) => {
      setData(responseData);
      return setLoading(false);
    });
    return window.alt.emit('request', operationName, requestData);
  }

  return {
    data,
    fetch,
    loading,
  };
}

export default useRequester;
