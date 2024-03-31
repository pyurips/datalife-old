import * as alt from 'alt-server';

class Vehicle {
  static allVehicles: Vehicle[] = [];
  public engineState = false;
  public engineHealth: 1000;
  public lockState: typeof this.vehicle.lockState = 2;
  public dirtLevel = 0;
  public numberPlateStyle: number;
  public numberPlateText: string;
  public fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  public fuelRate = 1;
  public fuel = 1000;
  private vehicle: alt.Vehicle;

  constructor(
    model: number,
    position: alt.Vector3,
    rotation: alt.Vector3,
    streamingDistance?: number
  ) {
    this.vehicle = new alt.Vehicle(
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
