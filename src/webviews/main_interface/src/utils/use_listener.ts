import { useEffect, useState } from 'react';

function useListener(eventName: string) {
  const [response, setResponse] = useState<any>();

  function eventHandler(response: any) {
    return setResponse(response);
  }

  useEffect(() => {
    if (window.alt) window.alt.on(eventName, eventHandler);

    return () => window.alt?.off(eventName, eventHandler);
  }, []);

  return response;
}

export function useGetPage():
  | 'signIn'
  | 'mainHud'
  | 'characterMenu'
  | 'adminPanel'
  | 'vehicleInteraction' {
  return useListener('client_setPage');
}

export function useGetCharacterData() {
  return useListener('server_getCharacterData');
}
