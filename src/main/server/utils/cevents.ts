import * as alt from 'alt-server';

export function emitter(
  player: alt.Player,
  type: 'request' | 'response',
  emitTo: 'client' | 'mainInterface',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'client') {
    return type === 'request'
      ? player.emitRaw(`request:${eventName}`, data)
      : player.emitRaw(`response:${eventName}`, data);
  }

  if (emitTo === 'mainInterface') {
    return type === 'request'
      ? player.emitRaw('emitToMainInterface', `request:${eventName}`, data)
      : player.emitRaw('emitToMainInterface', `response:${eventName}`, data);
  }
}
