import * as native from 'natives';
import * as alt from 'alt-client';

export function setHeadOverlay(
  overlayId: number,
  index: number,
  opacity: number
) {
  native.setPedHeadOverlay(alt.Player.local, overlayId, index, opacity);
}
