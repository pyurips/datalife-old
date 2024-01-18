import * as alt from 'alt-client';
import * as native from 'natives';

let pedInCreator = null;

export async function createPedInCreator() {
  pedInCreator = new alt.LocalPed(
    0x705e61f2,
    alt.Player.local.dimension,
    new alt.Vector3(-763.17, 330.59, 199.49),
    new alt.Vector3(0, 0, -3.06)
  );

  native.setPedHeadBlendData(pedInCreator, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
}

export function deletePedInCreator() {
  if (pedInCreator) return pedInCreator.destroy();
}

export function setPedInCreatorModel(model: number) {
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
