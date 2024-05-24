import { useState } from 'react';

export enum RequestNames {
  vehicle_getData = 'vehicle_getData',
  item_getInteractionDropData = 'item_getInteractionDropData',
}

export function useRequester<Req, Res>(
  operation: RequestNames,
  startLoading: boolean
) {
  const [loading, setLoading] = useState<boolean>(startLoading);
  const [data, setData] = useState<Res>();

  function fetch(requestData: Req) {
    setLoading(true);
    if (!window.alt) {
      console.error('Não foi encontrado o método alt no objeto Window');
      return setLoading(false);
    }

    window.alt.once(`response:${operation}`, (response: any) => {
      setData(response);
      return setLoading(false);
    });
    return window.alt.emit('request', operation, requestData);
  }

  return {
    data,
    fetch,
    loading,
  };
}
