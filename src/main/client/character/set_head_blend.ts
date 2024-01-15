import * as alt from 'alt-client';
import * as native from 'natives';

function setHeadBlend({
  fatherFace,
  motherFace,
  fatherSkin,
  motherSkin,
  faceMix,
  skinMix,
}: {
  fatherFace: number;
  motherFace: number;
  fatherSkin: number;
  motherSkin: number;
  faceMix: number;
  skinMix: number;
}) {
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

export default setHeadBlend;