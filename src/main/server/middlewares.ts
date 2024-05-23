import * as alt from 'alt-server';
import { sendClientError } from './utils.js';
import { AccountData } from '../shared/types.js';

export function checkPlayer(player: alt.Player, minPermissionLevel = 0) {
  if (!player?.valid) throw sendClientError(1716430246);
  const accountData = player.getLocalMeta('account') as AccountData;
  if (!accountData) throw sendClientError(1716430253);
  if (accountData.permissionLevel < minPermissionLevel)
    throw sendClientError(1715390300);
  if (!accountData._id) throw sendClientError(1713620728);
}
