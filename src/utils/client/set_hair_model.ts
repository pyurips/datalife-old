import * as alt from 'alt-client';
import * as native from 'natives';

export function setHairModel(
  hairOverlayColletion: string,
  hairOverlay: string,
  hairModel: number
) {
  const collection = native.getHashKey(hairOverlayColletion);
  const overlay = native.getHashKey(hairOverlay);
  native.addPedDecorationFromHashes(
    alt.Player.local,
    collection,
    overlay
  );
  native.setPedComponentVariation(
    alt.Player.local,
    2,
    hairModel,
    0,
    0
  );
}
