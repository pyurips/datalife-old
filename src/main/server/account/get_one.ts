import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';
import IAccount from '../../shared/IAccount.js';

async function account_getOne(player: alt.Player, data?: any) {
  try {
    const accountData = player.getLocalMeta('accountData') as IAccount;
    if (!accountData) throw sendClientError(1711616984);
    return accountData;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1711616956);
  }
}

export default account_getOne;
