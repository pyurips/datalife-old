import { useEffect, useState } from 'react';

export function useListener(eventName: string) {
  const [response, setResponse] = useState<any>();

  function eventHandler(response: any) {
    return setResponse(response);
  }

  useEffect(() => {
    if (window.alt) window.alt.on(eventName, eventHandler);
  }, []);

  function turnOffEvent() {
    if (window.alt) window.alt?.off(eventName, eventHandler);
  }

  return {
    response,
    turnOffEvent,
  };
}
