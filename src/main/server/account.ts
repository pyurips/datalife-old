import * as alt from 'alt-server';
import Utils from './utils.js';
import Character from './character.js';

class Account {
  static allAccounts: Account[] = [];
  public playerInstance: alt.Player;
  public id: string;
  public discordId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public lastLogin: Date;
  public permissionLevel: number;
  public bits: number;
  public character: Character;

  constructor(playerInstance: alt.Player) {
    this.playerInstance = playerInstance;
  }

  public create(
    id: string,
    discordId: string,
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date,
    permissionLevel: number,
    bits: number
  ) {
    this.id = id;
    this.discordId = discordId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLogin = lastLogin;
    this.permissionLevel = permissionLevel;
    this.bits = bits;
    Account.allAccounts.push(this);
  }

  static getAccountByPlayerInstance(playerInstance: alt.Player) {
    const account = Account.allAccounts.find(
      (account) => account.playerInstance.id === playerInstance.id
    );
    if (!account) throw Utils.sendClientError(1711867687);
    return account;
  }

  public getAll() {
    if (this.permissionLevel < 2) throw Utils.sendClientError(1711915485);
    return Account.allAccounts;
  }

  public callableByRPC = {}
}

export default Account;
