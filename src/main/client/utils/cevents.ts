import * as alt from 'alt-client';

export function emitter(
  emitTo: 'server' | 'mainInterface',
  type: 'request' | 'response',
  eventName: string,
  data?: unknown
) {
  if (emitTo === 'server') {
    return alt.emitServerRaw(`${type}:${eventName}`, data);
  }

  if (emitTo === 'mainInterface') {
    return alt.emitRaw('emitToMainInterface', `${type}:${eventName}`, data);
  }
}
