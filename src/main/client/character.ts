import * as alt from 'alt-client';
import * as native from 'natives';

const player = alt.Player.local;

export function defaultCharacterBehaviors() {
  native.setPedConfigFlag(player, 241, true);
  native.setPedConfigFlag(player, 429, true);
  native.setPedConfigFlag(player, 448, true);
  native.setPedConfigFlag(player, 35, false);
  native.displayAmmoThisFrame(false);
  native.hideHudComponentThisFrame(7);
  native.hideHudComponentThisFrame(9);
  native.hideHudComponentThisFrame(6);
  //native.disableControlAction(0, 21, true); DESATIVAR PARA PODER CORRER

  alt.beginScaleformMovieMethodMinimap('SETUP_HEALTH_ARMOUR');
  native.scaleformMovieMethodAddParamInt(3);
  native.endScaleformMovieMethod();
}
