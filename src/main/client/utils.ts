import * as alt from 'alt-client';
import * as native from 'natives';

let cursorCount = 0;

export function showCursor(state: boolean) {
  if (state) {
    cursorCount += 1;
    try {
      alt.showCursor(true);
    } catch (_) {}
  } else {
    for (let i = 0; i < cursorCount; i++) {
      try {
        alt.showCursor(false);
      } catch (_) {}
    }
    cursorCount = 0;
  }
}

export function getCursorState() {
  return cursorCount > 0;
}

export function setPageMode(state: boolean) {
  if (state) {
    native.triggerScreenblurFadeIn(100);
  } else {
    native.triggerScreenblurFadeOut(100);
  }
  toggleNativeHud(!state);
  showCursor(state);
  alt.toggleGameControls(!state);
}

export function toggleNativeHud(state: boolean) {
  native.displayRadar(state);
  native.displayHud(state);
}

export function getDistanceBetween(vector1: alt.Vector3, vector2: alt.Vector3) {
  return Math.sqrt(
    Math.pow(vector1.x - vector2.x, 2) +
      Math.pow(vector1.y - vector2.y, 2) +
      Math.pow(vector1.z - vector2.z, 2)
  );
}

export function getClosestVectorFromGroup(
  pos: alt.Vector3,
  arrayOfPositions: { pos: alt.Vector3 }[],
  range: number
) {
  const positionsInRange = arrayOfPositions.filter(
    (item) => getDistanceBetween(pos, item.pos) <= range
  );
  positionsInRange.sort((a, b) => {
    return getDistanceBetween(pos, a.pos) - getDistanceBetween(pos, b.pos);
  });
  return positionsInRange[0];
}

export function getClosestVehicleFromPlayer(
  player: alt.Player,
  range: number,
  excludeMine: boolean = false
) {
  return getClosestVectorFromGroup(
    player.pos,
    [...alt.Vehicle.streamedIn].filter((vehicle) => {
      if (
        excludeMine &&
        player.vehicle?.valid &&
        vehicle.id === player.vehicle.id
      )
        return false;
      return true;
    }),
    range
  );
}

export function getClosestMarkerFromPlayer(player: alt.Player, range: number) {
  return getClosestVectorFromGroup(player.pos, [...alt.Marker.all], range);
}

export function getClosestObjectFromPlayer(player: alt.Player, range: number) {
  return getClosestVectorFromGroup(player.pos, [...alt.LocalObject.all], range);
}
