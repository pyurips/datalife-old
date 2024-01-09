import * as alt from 'alt-server';

export function emitter(
  player: alt.Player,
  type: 'request' | 'response',
  emitTo: 'client' | 'mainInterface',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'client') {
    return alt.emitClientRaw(player, `${type}:${eventName}`, data);
  }

  if (emitTo === 'mainInterface') {
    return alt.emitClientRaw(player, 'emitToMainInterface', `${type}:${eventName}`, data)
  }
}
