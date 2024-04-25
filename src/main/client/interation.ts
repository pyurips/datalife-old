import * as alt from 'alt-client';
import { getDistanceBetween } from './utils.js';
import { getClosestObjectFromPlayer } from './utils.js';

export let OBJECT_view_BASE: alt.LocalObject = null;

export async function interaction_initializeObjectViewBase() {
  OBJECT_view_BASE = new alt.LocalObject(
    'prop_cs_box_clothes',
    new alt.Vector3(0, 0, 0),
    new alt.Vector3(0, 0, 0)
  );
  await alt.Utils.requestModel(OBJECT_view_BASE.model);
  OBJECT_view_BASE.frozen = true;
  OBJECT_view_BASE.positionFrozen = true;
  OBJECT_view_BASE.toggleCollision(false, false);
}

export function interation_check() {
  const closestVehicle = alt.Utils.getClosestVehicle({ range: 5 });

  const closestEntity = [closestVehicle].reduce((prev, curr) => {
    if (prev === null) return curr;
    if (curr === null) return prev;

    const prevDist = getDistanceBetween(alt.Player.local.pos, prev.pos);
    const currDist = getDistanceBetween(alt.Player.local.pos, curr.pos);

    return prevDist < currDist ? prev : curr;
  }, null);

  if (!closestEntity)
    return alt.setMeta('closestInteractionEntity', OBJECT_view_BASE);
  alt.setMeta('closestInteractionEntity', closestEntity);
}

export function interaction_getClosestInteractionEntity() {
  return alt.getMeta('closestInteractionEntity') as alt.Vehicle | alt.Object;
}
