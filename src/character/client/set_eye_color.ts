import * as native from 'natives';
import * as alt from 'alt-client';

alt.on('request:character_setEyeColor', (color: number) => {
  native.setHeadBlendEyeColor(alt.Player.local, color);
});
