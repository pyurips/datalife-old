import * as alt from 'alt-server';
import Account from './account.js';

class Vehicle {
  static allVehicles: Vehicle[] = [];
  public engineState = false;
  public engineHealth: 1000;
  public lockState: typeof this.vehicleInstance.lockState = 2;
  public dirtLevel = 0;
  public numberPlateStyle: number;
  public numberPlateText: string;
  public fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  public fuelRate = 1;
  public fuel = 1000;
  private vehicleInstance: alt.Vehicle;

  private player: alt.Player;
  private account: Account;
  constructor(account: Account) {
    this.account = account;
    this.player = alt.Player.getByID(account.sessionId);
  }

  public create(
    model: number,
    position: alt.Vector3,
    rotation: alt.Vector3,
    streamingDistance?: number
  ) {
    this.vehicleInstance = new alt.Vehicle(
      model,
      position.x,
      position.y,
      position.z,
      rotation.x,
      rotation.y,
      rotation.z,
      streamingDistance
    );
    Vehicle.allVehicles.push(this);
  }

  public updateFuel() {
    if (!this.engineState) return;
    const newFuel =
      this.fuel - this.fuelRate <= 0 ? 0 : this.fuel - this.fuelRate;
    if (newFuel === 0) this.engineState = false;
  }

  public toggleEngine() {
    this.engineState = !this.engineState;
  }

  public toggleLock(lockState: typeof this.lockState) {
    this.lockState = lockState;
  }

  private toggleLights() {}
  private toggleTrunk() {}
  private toggleHood() {}
  private toggleWindows() {}
  private toggleDoors() {}
}

export default Vehicle;
