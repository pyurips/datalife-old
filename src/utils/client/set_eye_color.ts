import * as native from 'natives';
import * as alt from 'alt-client';

export function setEyeColor(color: number) {
  native.setHeadBlendEyeColor(alt.Player.local, color);
}
