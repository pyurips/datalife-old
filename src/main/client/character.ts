import * as alt from 'alt-client';
import * as native from 'natives';

const player = alt.Player.local;

export function defaultCharacterBehaviors() {
  native.setPedConfigFlag(player, 241, true);
  native.setPedConfigFlag(player, 429, true);
  native.setPedConfigFlag(player, 448, true);
  native.displayAmmoThisFrame(false);
  native.disableControlAction(0, 37, true);
  native.disableControlAction(0, 199, true);
  //native.disableControlAction(0, 21, true); DESATIVAR PARA PODER CORRER
}

export function healthAndArmourBarBehaviour() {
  alt.beginScaleformMovieMethodMinimap('SETUP_HEALTH_ARMOUR');
  native.scaleformMovieMethodAddParamInt(3);
  native.endScaleformMovieMethod();
}
