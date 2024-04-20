import * as alt from 'alt-server';
import { AccountData, CharacterData, AccountMeta } from './types.js';
import { sendClientError } from './utils.js';
import { vehicle_createByWorld } from './vehicle.js';
import { getAccountById, updateAccountData } from './mongodb_account.js';

export function player_setAccountMeta(player: alt.Player, meta: AccountMeta) {
  if (!player?.valid) throw sendClientError(1713611970);
  player.setMeta('accountMeta', meta);
}

export function player_getAccountMeta(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713611960);
  return player.getMeta('accountMeta') as AccountMeta;
}

export function player_updateAccountMeta(
  player: alt.Player,
  meta: Partial<AccountMeta>
) {
  if (!player?.valid) throw sendClientError(1713611950);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  player_setAccountMeta(player, { ...accountMeta, ...meta });
}

export async function player_getAccountData(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440487);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  return await getAccountById(accountMeta.id);
}

export async function player_updateAccountData(
  player: alt.Player,
  data: Partial<AccountData>
) {
  if (!player?.valid) throw sendClientError(1713440477);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  return await updateAccountData(accountMeta.id, data);
}

export function player_loadIntoWorld(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440399);
  player.spawn(-14.295, 24.695, 71.656);
  player.dimension = 0;
  setTimeout(() => {
    vehicle_createByWorld(player);
  }, 2000);
  setTimeout(() => {
    vehicle_createByWorld(player);
  }, 8000);
}

export const callableByRPC = {
  player_getAccountData,
};
