import * as alt from 'alt-server';

type IResponse = {
  data: unknown;
  status: number;
  error: { message: string; internalCode: number };
};

export function emitter(
  player: alt.Player,
  emitTo: 'client' | 'mainInterface',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'client') {
    return player.emitRaw(eventName, data);
  }

  if (emitTo === 'mainInterface') {
    return player.emitRaw('emitToMainInterface', eventName, data);
  }
}

export async function requester(
  player: alt.Player,
  emitTo: 'client' | 'mainInterface',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'client') {
    return new Promise((resolve) => {
      alt.onceClient(`response:${eventName}`, (_, response: IResponse) => {
        resolve(response);
      });
      player.emitRaw(`request:${eventName}`, data);
    });
  }

  if (emitTo === 'mainInterface') {
    return new Promise((resolve) => {
      alt.onceClient(`response:${eventName}`, (_, response: IResponse) => {
        resolve(response);
      });
      player.emitRaw('emitToMainInterface', `request:${eventName}`, data);
    });
  }

  return console.error('Não é possível enviar para ' + emitTo);
}