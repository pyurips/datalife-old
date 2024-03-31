import * as alt from 'alt-server';
import Auth from "./auth.js";
import Vehicle from "./vehicle.js";
import Admin from "./admin.js";
import Account from './account.js';

function getOperation(player: alt.Player, type: string, operation: string) {
  if (type === 'auth') {
    const auth = new Auth(player);
    return auth.callableByRPC[operation].bind(auth);
  };
  if (type === 'vehicle') {
    const vehicle = new Vehicle(Account.getAccountBySessionId(player.id));
    return vehicle.callableByRPC[operation].bind(vehicle);
  };
  if (type === 'admin') {
    const admin = new Admin(Account.getAccountBySessionId(player.id));
    return admin.callableByRPC[operation].bind(admin);
  };
}

export default getOperation;