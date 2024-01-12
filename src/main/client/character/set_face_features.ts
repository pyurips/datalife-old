import * as alt from 'alt-client';
import * as native from 'natives';

alt.on(
  'request:character_setFaceFeature',
  ({ featureId, scale }: { featureId: number; scale: number }) => {
    native.setPedMicroMorph(alt.Player.local, featureId, scale);
  }
);
