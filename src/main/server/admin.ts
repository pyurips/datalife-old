import * as alt from 'alt-server';
import Utils from './utils.js';
import Account from './account.js';

class Admin {
  private player: alt.Player;
  private account: Account;
  constructor(account: Account) {
    this.account = account;
    this.player = alt.Player.getByID(account.sessionId);
  }

  private checkPermission(level: number) {
    if (this.account.permissionLevel < level) throw Utils.sendClientError(1711835426);
  }

  admin_vehicles_createToMe(data?: any) {
    this.checkPermission(3);
    // TODO
  }

  admin_vehicles_createToCoords(data?: any) {
    this.checkPermission(3);
    // TODO
  }

  admin_vehicles_createToPlayer(data?: any) {
    this.checkPermission(3);
    // TODO
  }

  admin_vehicles_delete(data?: any) {
    this.checkPermission(3);
    // TODO
  }

  admin_vehicles_deleteAll(data?: any) {
    this.checkPermission(3);
    // TODO
  }
}

export default Admin;
