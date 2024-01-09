import * as alt from 'alt-client';

export function emitter(
  emitTo: 'server' | 'mainInterface',
  type: 'request' | 'response',
  eventName: string,
  data: unknown
) {
  if (emitTo === 'server') {
    return type === 'request'
      ? alt.emitServerRaw(`request:${eventName}`, data)
      : alt.emitServerRaw(`response:${eventName}`, data);
  }

  if (emitTo === 'mainInterface') {
    return type === 'request'
      ? alt.emitRaw('emitToMainInterface', `request:${eventName}`, data)
      : alt.emitRaw('emitToMainInterface', `response:${eventName}`, data);
  }
}
