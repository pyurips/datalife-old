import * as alt from 'alt-client';
import * as native from 'natives';

function setCharacterEyeColor(color: number) {
  native.setHeadBlendEyeColor(alt.Player.local, color);
}

export default setCharacterEyeColor;