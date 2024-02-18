import * as alt from 'alt-client';
import * as native from 'natives';

function defaultCharacterBehaviors() {
  const player = alt.Player.local;
  native.setPedConfigFlag(player, 241, true);
  native.setPedConfigFlag(player, 429, true);
  native.setPedConfigFlag(player, 448, true);
}

export default defaultCharacterBehaviors;
