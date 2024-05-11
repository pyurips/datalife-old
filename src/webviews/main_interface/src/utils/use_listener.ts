import { useEffect, useState } from 'react';

export enum EventNames {
  player_getCharacterData = 'player_getCharacterData',
  webView_setPage = 'webView_setPage',
}

export function useListener<R>(eventName: EventNames) {
  const [response, setResponse] = useState<R>();

  function eventHandler(response: R) {
    return setResponse(response);
  }

  useEffect(() => {
    if (window.alt) window.alt.on(eventName, eventHandler);

    return () => window.alt?.off(eventName, eventHandler);
  }, []);

  return response;
}
