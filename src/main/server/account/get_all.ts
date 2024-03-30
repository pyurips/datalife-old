import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';
import IAccount from '../../shared/IAccount.js';

async function account_getAll(player: alt.Player, data?: any) {
  try {
    const accountData = player.getLocalMeta('accountData') as IAccount;
    if (accountData.permission_level < 2) throw sendClientError(1711761250);
    return alt.Player.all.map(e => e.getLocalMeta('accountData'));
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1711761259);
  }
}

export default account_getAll;
