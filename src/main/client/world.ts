import * as alt from 'alt-client';

export async function world_teleportPlayerToOther(data: unknown) {
  return await alt.emitRpc('world_teleportPlayerToOther', data);
}

export async function world_teleportToCoords(data: unknown) {
  return await alt.emitRpc('world_teleportToCoords', data);
}

export default {
  world_teleportPlayerToOther,
  world_teleportToCoords,
}