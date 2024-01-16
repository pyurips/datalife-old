import { useState } from 'react';

function useRequester(operationName: string, startLoading: boolean) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [responseData, setResponseData] = useState<unknown>();

  function fetchData(requestData?: unknown) {
    setLoading(true);
    if (!window.alt) {
      console.error('Não foi encontrado o método alt no objeto Window');
      return setLoading(false);
    }

    window.alt.once(`response:${operationName}`, (responseData: unknown) => {
      setResponseData(responseData);
      return setLoading(false);
    });
    return window.alt.emit('request', operationName, requestData);
  }

  return {
    responseData,
    fetchData,
    loading,
  };
}

export default useRequester;
