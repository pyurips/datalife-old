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

  constructor(
    playerInstance: alt.Player,
    id: string,
    discordId: string,
    createdAt: Date,
    updatedAt: Date,
    lastLogin: Date,
    permissionLevel: number,
    bits: number
  ) {
    this.playerInstance = playerInstance;
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

  public loadCharacter() {
    if (this.character) throw Utils.sendClientError(1712108032);
    this.character = new Character(this.playerInstance);
    this.character.updateAll(
      100,
      1000,
      0,
      1,
      0,
      [],
      100,
      {
        hunger: { value: 100, rate: 0 },
        thirst: { value: 100, rate: 0 },
        fatigue: { value: 100, rate: 0 },
        bathroom: { value: 100, rate: 0 },
        hygiene: { value: 100, rate: 0 },
      },
      [],
      []
    );
    this.character.addToBelongings(0, 'consumable', 0, 10);
    this.character.addToBelongings(1, 'cloth', 1, 5);
    this.character.addToBelongings(0, 'material', 0, 20);
    this.character.addToBelongings(0, 'material', 2, 20);
    return 1;
  }

  public callableByRPC = {
    getAll: this.getAll,
    loadCharacter: this.loadCharacter,
  };
}

export default Account;
