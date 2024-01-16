import { useState } from 'react';

export function useListener(eventName: string) {
  const [response, setResponse] = useState();

  function eventHandler(response: any) {
    return setResponse(response);
  }

  if (window.alt) window.alt.on(eventName, eventHandler);

  function turnOffEvent() {
    if (window.alt) window.alt?.off(eventName, eventHandler);
  }

  return {
    response,
    turnOffEvent,
  };
}
