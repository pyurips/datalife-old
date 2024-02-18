import * as alt from 'alt-server';

type IVehicleProps = {
  engineState?: boolean;
  engineHealth?: number;
  locked?: boolean;
  dirtLevel?: number;
  numberPlateStyle: number;
  numberPlateText: string;

  fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  fuelRate?: number;
  fuel?: number;
};

function createAVehicle(
  model: number,
  position: alt.Vector3,
  rotation: alt.Vector3,
  vehicleProps: IVehicleProps,
  streamingDistance?: number
) {
  const vehicle = new alt.Vehicle(
    model,
    position.x,
    position.y,
    position.z,
    rotation.x,
    rotation.y,
    rotation.z,
    streamingDistance
  );
  const vehicleData: IVehicleProps = {
    engineState: vehicleProps.engineState || false,
    engineHealth: vehicleProps.engineHealth || 1000,
    locked: vehicleProps.locked || true,
    dirtLevel: vehicleProps.dirtLevel || 0,
    numberPlateStyle: vehicleProps.numberPlateStyle,
    numberPlateText: vehicleProps.numberPlateText,

    fuelType: vehicleProps.fuelType,
    fuelRate: vehicleProps.fuelRate || 0.1,
    fuel: vehicleProps.fuel || 100,
  };
  vehicle.setSyncedMeta('vehicleData', vehicleData);
}

export default createAVehicle;