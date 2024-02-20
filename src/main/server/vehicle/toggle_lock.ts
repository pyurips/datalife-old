import * as alt from 'alt-server';

function toggleVehicleLock(player: alt.Player, data?: any) {
  if (!player) return;
  const vehicle = alt.Utils.getClosestVehicle({ pos: player.pos, range: 5 });
  if (!vehicle) return;
  const vehicleData = vehicle.getSyncedMeta('vehicleData') as any;
  vehicle.setSyncedMeta('vehicleData', {
    ...vehicleData,
    locked: vehicleData.locked === 1 ? 2 : 1,
  });
}

export default toggleVehicleLock;