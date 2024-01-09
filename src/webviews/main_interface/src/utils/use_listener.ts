import { useState } from 'react';

type IResponse = {
  data: unknown;
  status: number;
  error: { message: string; internalCode: number };
};

export function useListener(eventName: string) {
  if (!window.alt)
    return console.error('Não foi encontrado o método alt no objeto Window');

  const [response, setResponse] = useState<IResponse>();

  function eventHandler(response: IResponse) {
    return setResponse(response);
  }

  function turnOffListener() {
    if (!window.alt)
      return console.error('Não foi encontrado o método alt no objeto Window');
    return window.alt.off(`response:${eventName}`, eventHandler);
  }

  window.alt.on(`response:${eventName}`, eventHandler);

  return {
    response,
    turnOffListener
  };
}
