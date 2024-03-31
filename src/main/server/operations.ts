import * as alt from 'alt-server';
import Auth from "./auth.js";
import Vehicle from "./vehicle.js";
import Admin from "./admin.js";
import Account from './account.js';

function getOperation(player: alt.Player, type: string, operation: string) {
  if (type === 'auth') return new Auth(player)[operation];
  if (type === 'vehicle') return new Vehicle(Account.getAccountBySessionId(player.id))[operation];
  if (type === 'admin') return new Admin(Account.getAccountBySessionId(player.id))[operation];
}

export default getOperation;