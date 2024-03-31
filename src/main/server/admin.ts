import * as alt from 'alt-server';
import Utils from './utils.js';
import Account from './account.js';

class Admin {
  private account: Account;
  constructor(account: Account) {
    this.account = account;
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

  public callableByRPC() {
    return {
      admin_vehicles_createToMe: this.admin_vehicles_createToMe,
      admin_vehicles_createToCoords: this.admin_vehicles_createToCoords,
      admin_vehicles_createToPlayer: this.admin_vehicles_createToPlayer,
      admin_vehicles_delete: this.admin_vehicles_delete,
      admin_vehicles_deleteAll: this.admin_vehicles_deleteAll,
    }
  }
}

export default Admin;
