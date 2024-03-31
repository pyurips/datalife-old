import * as alt from 'alt-server';
import axios from 'axios';
import Utils from './utils.js';
import Account from './account.js';
import Postgresql from './postgresql.js';

class Auth {
  private player: alt.Player;
  constructor(player: alt.Player) {
    this.player = player;
  }

  async signin(data?: any) {
    try {
      const response = await axios.get('https://discordapp.com/api/users/@me', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${data.token}`,
        },
      });
      if (!response || !response.data.id)
        throw Utils.sendClientError(1705460913);
      const pool = new Postgresql();
      const accountData = await pool.signinByAccount(response.data.id);
      const accountConnected = new Account(this.player.id);
      accountConnected.create(
        accountData.id,
        accountData.discord_id,
        accountData.created_at,
        accountData.updated_at,
        accountData.last_login,
        accountData.permission_level,
        accountData.bits
      );
    } catch (e) {
      if (e.name === 'DATALIFEClientError') throw e;
      throw Utils.sendClientError(1705460706);
    }
  }
}

export default Auth;
