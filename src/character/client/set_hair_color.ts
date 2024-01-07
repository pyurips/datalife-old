import * as alt from 'alt-client';
import * as native from 'natives';

alt.on(
  'request:character_setHairColor',
  (primaryColor: number, secondaryColor: number) => {
    native.setPedHairTint(alt.Player.local, primaryColor, secondaryColor);
  }
);
