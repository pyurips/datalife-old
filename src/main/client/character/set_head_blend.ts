import * as alt from 'alt-client';
import * as native from 'natives';

alt.on(
  'request:character_setHeadBlend',
  (data: {
    fatherFace: number;
    motherFace: number;
    fatherSkin: number;
    motherSkin: number;
    faceMix: number;
    skinMix: number;
  }) => {
    native.setPedHeadBlendData(
      alt.Player.local,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false
    );

    native.setPedHeadBlendData(
      alt.Player.local,
      data.fatherFace,
      data.motherFace,
      0,
      data.fatherSkin,
      data.motherSkin,
      0,
      data.faceMix,
      data.skinMix,
      0,
      false
    );
  }
);
