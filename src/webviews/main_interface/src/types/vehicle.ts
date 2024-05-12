export type Request_vehicle_createToPlayer = {
  vehicleHash: number;
  playerId?: string;
};
export type Response_vehicle_createToPlayer = {error: string} | null;

export type Request_vehicle_getSpeed = null;
export type Response_vehicle_getSpeed = number | null;