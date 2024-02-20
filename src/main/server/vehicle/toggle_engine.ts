import * as alt from 'alt-server';

function toggleVehicleEngine(player: alt.Player, data?: any) {
  if (!player) return;
  const vehicle = player.vehicle;
  if (!vehicle) return;
  const vehicleData = vehicle.getSyncedMeta('vehicleData') as any;
  vehicle.setSyncedMeta('vehicleData', {
    ...vehicleData,
    engineState: !vehicleData.engineState,
  });
}

export default toggleVehicleEngine;
