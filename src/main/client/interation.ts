import * as alt from 'alt-client';
import Webview from './webview.js';

class Interation {
  static activeVehicleId: number | null = null;
  static activePanel: {} | null = null;

  static vehicleInteration() {
    const closestVehicle = alt.Utils.getClosestVehicle({ range: 5 });
    if (!closestVehicle) {
      Interation.activeVehicleId = null;
      return Webview.destroyObjectView(1);
    }

    const objectViewPos = new alt.Vector3(
      closestVehicle.pos.x,
      closestVehicle.pos.y,
      closestVehicle.pos.z + 2
    );

    if (closestVehicle.id !== Interation.activeVehicleId) {
      Interation.activeVehicleId = closestVehicle.id;
      Webview.destroyObjectView(1);
      return Webview.createObjectView(1, objectViewPos);
    }
    if (closestVehicle.id === Interation.activeVehicleId)
      return Webview.setObjectViewPos(1, objectViewPos);
  }
}

export default Interation;
