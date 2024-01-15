import * as alt from 'alt-server';

function emitter(
  player: alt.Player,
  emitTo: 'client' | 'mainInterface',
  who: 'all' | 'unique',
  eventName: string,
  data?: unknown
) {
  if (emitTo === 'client') {
    if (who === 'unique') return alt.emitClientRaw(player, eventName, data);
    if (who === 'all') return alt.emitAllClientsRaw(eventName, data);
  }

  if (emitTo === 'mainInterface') {
    if (who === 'unique')
      return alt.emitClientRaw(player, 'emitToMainInterface', eventName, data);
    if (who === 'all')
      return alt.emitAllClientsRaw('emitToMainInterface', eventName, data);
  }
}

export default emitter;
