import * as alt from 'alt-client';
import * as native from 'natives';

export function setFaceFeature(featureId: number, scale: number) {
  native.setPedMicroMorph(alt.Player.local.scriptID, featureId, scale);
}
