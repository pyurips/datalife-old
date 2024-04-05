import { useState } from 'react';

async function requester(
  operation: string,
  requestData?: unknown
): Promise<any> {
  return new Promise((resolve) => {
    if (!window.alt)
      return console.error('Não foi encontrado o método alt no objeto Window');
    window.alt.once(`response:${operation}`, (responseData: unknown) => {
      resolve(responseData);
    });
    window.alt.emit('request', operation, requestData);
  });
}

function useRequester(operations: string[], startLoading = true) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [data, setData] = useState<any[]>([]);

  async function fetch(...requestData: (unknown | null)[]) {
    setLoading(true);
    if (!window.alt) {
      console.error('Não foi encontrado o método alt no objeto Window');
      return setLoading(false);
    }

    for await (const [index, operation] of operations.entries()) {
      const response = await requester(operation, requestData[index]);
      if (response?.error) throw new Error(response.error);
      setData((prev) => [...prev, response]);
    }
    setLoading(false);
  }

  return {
    data,
    fetch,
    loading,
  };
}

export default useRequester;
