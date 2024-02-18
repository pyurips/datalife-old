import * as alt from 'alt-server';

function fuelHandler() {
  alt.Vehicle.all.forEach((e) => {
    if (!e) return;
    const vehicleData = e.getSyncedMeta('vehicleData') as any;
    const fuel = vehicleData.fuel as number;
    if (fuel <= 0) return e.setSyncedMeta('vehicleData', { ...vehicleData, engineState: false });
  });
}

export default fuelHandler;
