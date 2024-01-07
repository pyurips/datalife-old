import * as alt from 'alt-client';
import * as native from 'natives';

export function setHairColor(primaryColor: number, secondaryColor: number) {
  native.setPedHairTint(alt.Player.local, primaryColor, secondaryColor);
}
