import * as alt from 'alt-server';
import sendClientError from './utils/client_error';
import IAccount from '../shared/IAccount';

class Admin {
  private player: alt.Player;
  constructor(player: alt.Player) {
    this.player = player;
  }

  private checkPermission(level: number) {
    const accountData = this.player.getLocalMeta('accountData') as IAccount;
    if (accountData.permission_level < level) throw sendClientError(1711835426);
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
