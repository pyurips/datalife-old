import * as alt from 'alt-client';

class Vehicle {
  static vehicleInstance = alt.Player.local.vehicle;

  static speed() {
    return this.vehicleInstance.speed;
  }

  static gear() {
    return this.vehicleInstance.gear;
  }
}

export default Vehicle;