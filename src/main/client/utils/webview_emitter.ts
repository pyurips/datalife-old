import * as alt from 'alt-client';

function webViewEmitter(
  emitTo: 'emitToMainInterface',
  eventName: string,
  data?: unknown
) {
  return alt.emitRaw(emitTo, eventName, data);
}

export default webViewEmitter;
