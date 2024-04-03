import * as alt from 'alt-client';
import * as native from 'natives';

class Character {
  static player = alt.Player.local;

  static defaultCharacterBehaviors() {
    native.setPedConfigFlag(Character.player, 241, true);
    native.setPedConfigFlag(Character.player, 429, true);
    native.setPedConfigFlag(Character.player, 448, true);
  }
}

export default Character;
