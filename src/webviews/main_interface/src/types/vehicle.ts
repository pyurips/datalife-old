export type Request_vehicle_createToPlayer = {
  vehicleHash: number;
  playerId?: string;
};
export type Response_vehicle_createToPlayer = { error: string } | null;

export type Request_vehicle_getSpeed = null;
export type Response_vehicle_getSpeed = number | null;

export type Event_vehicle_setVehicleHUD = boolean;

export type Request_vehicle_getData = { interactionMode: boolean };
export type Response_vehicle_getData = {
  ownerId: string;
  fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  fuelRate: number;
  fuel: number;
  fuelCapacity: number;
  interactionImageUrl: string;
  trunk: {
    id: number;
    type: 'consumable' | 'material' | 'cloth';
    quality: 0 | 1 | 2;
    amount: number;
  }[];
  trunkWeightCapacity: number;
  trunkWeight: number;
  gloveCompartment: {
    id: number;
    type: 'consumable' | 'material' | 'cloth';
    quality: 0 | 1 | 2;
    amount: number;
  }[];
  gloveCompartmentWeightCapacity: number;
  gloveCompartmentWeight: number;
  gloveCompartmentState: boolean;
  batteryCharge: number;
  batteryCapacity: number;
  batteryState: boolean;
  allowedPlayers: string[];
  gear: number;
  speed: number;
  type: string | null;
} | null;
