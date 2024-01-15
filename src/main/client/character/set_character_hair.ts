import * as alt from 'alt-client';
import * as native from 'natives';

function setHair(hair: number) {
  native.setPedComponentVariation(alt.Player.local, 2, hair, 0, 0);
}

export default setHair;