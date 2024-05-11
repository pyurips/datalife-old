import * as alt from 'alt-client';
import {
  getClosestDropFromPlayer,
  getClosestVehicleFromPlayer,
  getDistanceBetween,
} from './utils.js';
import {
  webView_attachObjectViewTo,
  webView_emitCustomEventToObjectView,
} from './webview.js';

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
  const closestVehicle = getClosestVehicleFromPlayer(5, true);
  const closestObject = getClosestDropFromPlayer(3);
  const closestEntity = [closestVehicle, closestObject].reduce((prev, curr) => {
    if (!prev) return curr;
    if (!curr) return prev;

    const prevDist = getDistanceBetween(alt.Player.local.pos, prev.pos);
    const currDist = getDistanceBetween(alt.Player.local.pos, curr.pos);

    return prevDist < currDist ? prev : curr;
  }, null);

  if (!closestEntity) {
    webView_emitCustomEventToObjectView(1, 'interaction_getEntityType', null);
    return webView_attachObjectViewTo(1, OBJECT_view_BASE);
  }

  if (closestEntity.hasMeta('drop'))
    webView_emitCustomEventToObjectView(1, 'interaction_getEntityType', 'drop');

  if (closestEntity.hasStreamSyncedMeta('data'))
    webView_emitCustomEventToObjectView(1, 'interaction_getEntityType', 'vehicle');

  return webView_attachObjectViewTo(1, closestEntity);
}

export function interaction_checkOnTap() {
  const closestVehicle = getClosestVehicleFromPlayer(5, true);
  const closestObject = getClosestDropFromPlayer(3);
  const closestEntity = [closestVehicle, closestObject].reduce((prev, curr) => {
    if (!prev) return curr;
    if (!curr) return prev;

    const prevDist = getDistanceBetween(alt.Player.local.pos, prev.pos);
    const currDist = getDistanceBetween(alt.Player.local.pos, curr.pos);

    return prevDist < currDist ? prev : curr;
  }, null);

  return closestEntity;
}
