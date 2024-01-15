import * as alt from 'alt-client';
import * as native from 'natives';

function setFaceFeatures({
  featureId,
  scale,
}: {
  featureId: number;
  scale: number;
}) {
  native.setPedMicroMorph(alt.Player.local, featureId, scale);
}

export default setFaceFeatures;
