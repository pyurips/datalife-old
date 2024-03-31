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
}

export default Account;
