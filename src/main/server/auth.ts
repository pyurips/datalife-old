import * as alt from 'alt-server';
import axios from 'axios';
import sendClientError from './utils/client_error';
import accounts_signin from './database/postgresql/accounts/signin';

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
      if (!response || !response.data.id) throw sendClientError(1705460913);
      const accountData = await accounts_signin(response.data.id);
      return this.player.setLocalMeta("accountData", { ...accountData, name: response.data.global_name });
    } catch (e) {
      if (e.name === 'DATALIFEClientError') throw e;
      throw sendClientError(1705460706);
    }
  }
}

export default Auth;