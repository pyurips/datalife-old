import * as alt from 'alt-server';
import { getPermissionLevel } from './middlewares';

export function world_teleportMeByStaff(
  player: alt.Player,
  data: { x: number; y: number; z: number }
) {
  if (getPermissionLevel(player) < 1) return;
  player.pos = new alt.Vector3(data.x, data.y, data.z);
}

export function world_teleportPlayerToOtherByStaff(
  player: alt.Player,
  data: { firstId: number; secondId: number }
) {
  if (getPermissionLevel(player) < 1) return;
  const firstPlayer = alt.Player.all.find((p) => p.id === data.firstId);
  const secondPlayer = alt.Player.all.find((p) => p.id === data.secondId);
  if (!firstPlayer || !secondPlayer) return;
  firstPlayer.pos = secondPlayer.pos;
}

export const callableByRPC = {
  world_teleportMeByStaff,
  world_teleportPlayerToOtherByStaff,
};
