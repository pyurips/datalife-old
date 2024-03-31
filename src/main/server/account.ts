import * as alt from 'alt-server';
import Utils from "./utils.js";

class Account {
  static allAccounts: Account[] = [];
  public sessionId: number;
  public id: string;
  public discordId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public lastLogin: Date;
  public permissionLevel: number;
  public bits: number;

  constructor(sessionId: number) {
    this.sessionId = this.sessionId;
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

  static getAccountBySessionId(sessionId: number) {
    const account = Account.allAccounts.find(
      (account) => account.sessionId === sessionId
    );
    if (!account) throw Utils.sendClientError(1711867687);
    return account;
  }

  public getPlayerInstance() {
    return alt.Player.getByID(this.sessionId);
  }
}

export default Account;
