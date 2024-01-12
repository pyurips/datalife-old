import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('request:character_setCharacterEyeColor', (color: number) => {
  native.setHeadBlendEyeColor(alt.Player.local, color);
});
