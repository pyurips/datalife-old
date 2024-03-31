import * as alt from 'alt-server';
import Account from './account.js';
import Utils from './utils.js';

class Vehicle {
  static allVehicles: Vehicle[] = [];
  public sessionId: number;
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

  private hasCreated () {}

  public create(
    model: number,
    position: alt.Vector3,
    rotation: alt.Vector3,
    streamingDistance?: number
  ) {
    if (this.account.permissionLevel < 3) throw Utils.sendClientError(1711876657);
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
    this.sessionId = this.vehicleInstance.id;
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

  public callableByRPC() {
    return {
      create: this.create,
      toggleEngine: this.toggleEngine,
      toggleLock: this.toggleLock,
    }
  }
}

export default Vehicle;
