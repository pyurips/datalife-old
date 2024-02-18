import * as alt from 'alt-server';

type IVehicleProps = {
  fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  fuelRate: number;
  fuelCapacity: number;
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
    fuelType: vehicleProps.fuelType,
    fuelRate: vehicleProps.fuelRate,
    fuelCapacity: vehicleProps.fuelCapacity,
  };
  vehicle.setMeta('vehicleData', vehicleData);
}

export default createAVehicle;
