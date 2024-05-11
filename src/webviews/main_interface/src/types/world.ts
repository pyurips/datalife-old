export type Request_world_teleportToCoords = {
  x: number;
  y: number;
  z: number;
  playerId?: string;
};
export type Response_world_teleportToCoords = { error: string } | null;

export type Request_world_teleportPlayerToOther = {
  firstId: string;
  secondId: string;
};
export type Response_world_teleportPlayerToOther = { error: string } | null;