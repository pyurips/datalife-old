import * as alt from 'alt-server';

async function toggleVehicleLock(player: alt.Player, data?: any) {
  if (!player) return;
  const vehicle = alt.Utils.getClosestVehicle({ pos: player.pos, range: 5 });
  if (!vehicle) return;
  const vehicleData = vehicle.getSyncedMeta('vehicleData') as any;
  player.playAnimation(
    'anim@mp_player_intmenu@key_fob@',
    'fob_click_fp',
    8.0,
    -8,
    -1,
    50,
    0,
    false,
    false,
    false
  );
  vehicle.setSyncedMeta('vehicleData', {
    ...vehicleData,
    locked: vehicleData.locked === 1 ? 2 : 1,
  });
  await alt.Utils.wait(1000);
  player.playAnimation(
    'anim@mp_player_intmenu@key_fob@',
    'fob_click_fp',
    8.0,
    8.0,
    -1,
    48,
    1,
    false,
    false,
    false
  );
}

export default toggleVehicleLock;
