import * as native from 'natives';
import * as alt from 'alt-client';

alt.on(
  'request:character_setHeadOverlayColor',
  (
    overlayId: number,
    colorType: number,
    primaryColor: number,
    secondaryColor: number
  ) => {
    native.setPedHeadOverlayTint(
      alt.Player.local,
      overlayId,
      colorType,
      primaryColor,
      secondaryColor
    );
  }
);
