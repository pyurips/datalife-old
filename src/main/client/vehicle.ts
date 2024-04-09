import * as alt from 'alt-client';
import * as native from 'natives';

class Vehicle {
  static vehicleInstance = alt.Player.local.vehicle;

  static speed() {
    return this.vehicleInstance.speed;
  }

  static gear() {
    return this.vehicleInstance.gear;
  }

  static type() {
    if (native.isThisModelABicycle(this.vehicleInstance.model)) return 'bicycle';
    if (native.isThisModelABike(this.vehicleInstance.model)) return 'bike';
    if (native.isThisModelABoat(this.vehicleInstance.model)) return 'boat';
    if (native.isThisModelACar(this.vehicleInstance.model)) return 'car';
    if (native.isThisModelAHeli(this.vehicleInstance.model)) return 'heli';
    if (native.isThisModelAPlane(this.vehicleInstance.model)) return 'plane';
    if (native.isThisModelAQuadbike(this.vehicleInstance.model)) return 'quadbike';
    return null;
  }
}

export default Vehicle;