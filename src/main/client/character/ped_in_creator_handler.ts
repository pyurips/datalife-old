import * as alt from 'alt-client';
import * as native from 'natives';

let pedInCreator = null;
let pedInCreatorModel = null;
let pedInCreatorHeadBlend = null;
let pedInCreatorEyeColor = null;
let pedInCreatorHair = null;
let pedInCreatorHairColors = { primary: null, secondary: null };

export function createPedInCreator() {
  const player = alt.Player.local;
  pedInCreator = new alt.LocalPed(
    player.model,
    player.dimension,
    new alt.Vector3(-763.17, 330.59, 199.49),
    new alt.Vector3(0, 0, -3.06)
  );

  native.setPedHeadBlendData(pedInCreator, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
}

export function deletePedInCreator() {
  if (pedInCreator) return pedInCreator.destroy();
}

export async function setPedInCreatorModel(model: number) {
  await alt.Utils.requestModel(model);
  pedInCreator.model = model;
  native.setPedHeadBlendData(pedInCreator, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
}

export function setPedInCreatorHeadBlend({
  fatherFace,
  motherFace,
  fatherSkin,
  motherSkin,
  faceMix,
  skinMix,
}) {
  native.setPedHeadBlendData(
    pedInCreator,
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
