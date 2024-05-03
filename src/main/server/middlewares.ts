import * as alt from 'alt-server';
import { sendClientError } from './utils.js';
import { AccountData } from './types.js';

export function checkPlayer(player: alt.Player) {
  if (!player?.valid) return;
  const accountData = player.getLocalMeta('account') as AccountData;
  if (!accountData._id) throw sendClientError(1713620728);
}

export function getPermissionLevel(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1714770857);
  const accountData = player.getLocalMeta('account') as AccountData;
  return accountData.permissionLevel;
}
