import * as alt from 'alt-server';
import { sendClientError } from './utils.js';
import { AccountMeta } from './types.js';

export function checkPlayer(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440399);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  if (!accountMeta.id) throw sendClientError(1713620728);
}
