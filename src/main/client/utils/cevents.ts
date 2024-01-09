import * as alt from 'alt-client';

type IResponse = {
  data: unknown;
  status: number;
  error: { message: string; internalCode: number };
};

export function emitter(
  emitTo: 'server' | 'mainInterface',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'server') {
    return alt.emit(eventName, data);
  }

  if (emitTo === 'mainInterface') {
    return alt.emitRaw('emitToMainInterface', eventName, data);
  }
}

export async function requester(
  emitTo: 'server' | 'mainInterface',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'server') {
    return new Promise((resolve) => {
      alt.onceServer(`response:${eventName}`, (response: IResponse) => {
        resolve(response);
      });
      alt.emitServerRaw(`request:${eventName}`, data);
    });
  }

  if (emitTo === 'mainInterface') {
    return new Promise((resolve) => {
      alt.once(`response:${eventName}`, (response: IResponse) => {
        resolve(response);
      });
      alt.emitRaw('emitToMainInterface', `request:${eventName}`, data);
    });
  }

  return console.error('Não é possível enviar para ' + emitTo);
}
