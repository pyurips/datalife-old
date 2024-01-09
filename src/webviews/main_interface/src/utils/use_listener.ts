import { useState } from 'react';

type IResponse = {
  data: unknown;
  status: number;
  error: { message: string; internalCode: number };
};

export function useListener(eventName: string) {
  const [response, setResponse] = useState<IResponse>();

  function eventHandler(response: IResponse) {
    return setResponse(response);
  }

  if (window.alt) window.alt.on(`response:${eventName}`, eventHandler);

  return response;
}
