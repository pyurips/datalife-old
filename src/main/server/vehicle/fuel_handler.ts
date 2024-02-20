import * as alt from 'alt-server';

function fuelHandler() {
  alt.Vehicle.all.forEach((e) => {
    if (!e) return;
    const vehicleData = e.getSyncedMeta('vehicleData') as any;
    if (!vehicleData.engineState) return;
    const newFuel =
      vehicleData.fuel - vehicleData.fuelRate <= 0
        ? 0
        : vehicleData.fuel - vehicleData.fuelRate;
    e.setSyncedMeta('vehicleData', { ...vehicleData, fuel: newFuel });
  });
}

export default fuelHandler;
