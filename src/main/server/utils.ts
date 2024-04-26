import * as alt from 'alt-server';
import { MainWebViewEvents } from './types.js';

export function sendClientError(
  internalCode: number,
  showInternalCode = true,
  message?: string
) {
  const clientError = new Error(
    (message ||
      'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.') +
      `${showInternalCode && ` (${internalCode})`}`
  );
  clientError.name = 'DATALIFEClientError';
  return clientError;
}

export function emitToMainWebViewUnique(
  player: alt.Player,
  event: MainWebViewEvents,
  data?: unknown
) {
  alt.emitClientRaw(player, 'emitCustomServerEventToMainWebView', event, data);
}

export function emitToMainWebViewAll(event: MainWebViewEvents, data?: unknown) {
  alt.emitAllClientsRaw('emitCustomServerEventToMainWebView', event, data);
}

export function getDistanceBetween(vector1: alt.Vector3, vector2: alt.Vector3) {
  return Math.sqrt(
    Math.pow(vector1.x - vector2.x, 2) +
      Math.pow(vector1.y - vector2.y, 2) +
      Math.pow(vector1.z - vector2.z, 2)
  );
}

export function getClosestDropFromPlayer(player: alt.Player, range: number) {
  const positionsInRange = alt.VirtualEntity.all.filter(
    (e) =>
      e.hasStreamSyncedMeta('drop') &&
      getDistanceBetween(player.pos, e.pos) <= range
  );
  positionsInRange.sort((a, b) => {
    return (
      getDistanceBetween(player.pos, a.pos) -
      getDistanceBetween(player.pos, b.pos)
    );
  });
  return positionsInRange[0];
}

export function getClosestVehicleFromPlayer(
  player: alt.Player,
  range: number,
  excludeMine = false
) {
  const positionsInRange = alt.Vehicle.all.filter((vehicle) => {
    if (
      excludeMine &&
      player.vehicle?.valid &&
      vehicle.id === player.vehicle.id
    )
      return false;
    return true;
  });
  positionsInRange.sort((a, b) => {
    return (
      getDistanceBetween(player.pos, a.pos) -
      getDistanceBetween(player.pos, b.pos)
    );
  });
  return positionsInRange[0];
}
