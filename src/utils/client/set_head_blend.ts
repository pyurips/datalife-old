import * as alt from 'alt-client';
import * as native from 'natives';

export function setHeadBlendData(
  fatherFace: number,
  motherFace: number,
  fatherSkin: number,
  motherSkin: number,
  faceMix: number,
  skinMix: number
) {
  native.setPedHeadBlendData(
    alt.Player.local.scriptID,
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
    alt.Player.local.scriptID,
    fatherFace,
    motherFace,
    0,
    fatherSkin,
    motherSkin,
    0,
    faceMix,
    skinMix,
    0,
    false
  );
}
