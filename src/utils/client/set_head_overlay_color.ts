import * as native from 'natives';
import * as alt from 'alt-client';

export function setHeadOverlayColor(
  overlayId: number,
  colorType: number,
  primaryColor: number,
  secondaryColor: number
) {
  native.setPedHeadOverlayTint(
    alt.Player.local,
    overlayId,
    colorType,
    primaryColor,
    secondaryColor
  );
}
