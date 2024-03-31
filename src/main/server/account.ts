import * as alt from 'alt-server';

class Account {
  private playerInstance: alt.Player;
  private id: string;
  private name: string;
  private discordId: string;
  private createdAt: Date;
  private updatedAt: Date;
  private lastLogin: Date;
  private permissionLevel: number;
  private bits: number;

  constructor(player: alt.Player) {
    this.playerInstance = player;
  }
}

export default Account;
