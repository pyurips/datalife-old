import * as alt from 'alt-server';
import Account from './account.js';
import Utils from './utils.js';

class Vehicle {
  static allVehicles: Vehicle[] = [];
  public fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  public fuelRate = 1;
  public fuel = 1000;
  public vehicleInstance: alt.Vehicle;

  private account: Account;
  constructor(account: Account) {
    this.account = account;
  }

  private getVehicleInstanceById(id: number) {
    const vehicle = Vehicle.allVehicles.find(
      (vehicle) => vehicle.vehicleInstance.id === id
    );
    if (!vehicle) throw Utils.sendClientError(1711939878);
    return vehicle;
  }

  public create(data: {
    model: number;
    position: alt.Vector3;
    rotation: alt.Vector3;
    fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
    fuelRate: number;
    fuel: number;
    streamingDistance?: number;
  }) {
    if (this.account.permissionLevel < 3)
      throw Utils.sendClientError(1711876657);
    this.fuelType = data.fuelType;
    this.fuelRate = data.fuelRate;
    this.fuel = data.fuel;
    this.vehicleInstance = new alt.Vehicle(
      data.model,
      data.position.x,
      data.position.y,
      data.position.z,
      data.rotation.x,
      data.rotation.y,
      data.rotation.z,
      data?.streamingDistance
    );
    Vehicle.allVehicles.push(this);
  }

  public updateFuel() {
    if (!this.vehicleInstance.engineOn) return;
    const newFuel =
      this.fuel - this.fuelRate <= 0 ? 0 : this.fuel - this.fuelRate;
    if (newFuel === 0) this.vehicleInstance.engineOn = false;
  }

  public callableByRPC = {
    create: this.create,
  };
}

export default Vehicle;
