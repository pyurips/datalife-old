import { useState } from 'react';

async function useRequester(operationName: string, startLoading: boolean) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [responseData, setResponseData] = useState<unknown>();

  async function fetchData(requestData: unknown) {
    setLoading(true);
    if (!window.alt)
      return console.error('Não foi encontrado o método alt no objeto Window');
    window.alt.once('response', (responseData: unknown) => {
      setResponseData(responseData);
      setLoading(false);
    });
    window.alt.emit('request', operationName, requestData);
  }

  return {
    responseData,
    fetchData,
    loading,
  };
}

export default useRequester;
