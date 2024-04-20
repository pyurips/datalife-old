import * as alt from 'alt-server';
import { AccountData, CharacterData, AccountMeta } from './types.js';
import { vehicle_createByWorld } from './vehicle.js';
import { getAccountById, updateAccountData } from './mongodb_account.js';
import { checkPlayer } from './middlewares.js';

export function player_setAccountMeta(player: alt.Player, meta: AccountMeta) {
  checkPlayer(player);
  player.setMeta('accountMeta', meta);
}

export function player_getAccountMeta(player: alt.Player) {
  checkPlayer(player);
  return player.getMeta('accountMeta') as AccountMeta;
}

export function player_updateAccountMeta(
  player: alt.Player,
  meta: Partial<AccountMeta>
) {
  checkPlayer(player);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  player_setAccountMeta(player, { ...accountMeta, ...meta });
}

export async function player_getAccountData(player: alt.Player) {
  checkPlayer(player);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  return await getAccountById(accountMeta.id);
}

export async function player_updateAccountData(
  player: alt.Player,
  data: Partial<AccountData>
) {
  checkPlayer(player);
  const accountMeta = player.getMeta('accountMeta') as AccountMeta;
  return await updateAccountData(accountMeta.id, data);
}

export function player_loadIntoWorld(player: alt.Player) {
  //checkPlayer(player); ESTÁ EM FASE DE TESTE
  player.spawn(-14.295, 24.695, 71.656);
  player.dimension = 0;
  setTimeout(() => {
    vehicle_createByWorld(player);
  }, 2000);
}

export const callableByRPC = {
  player_getAccountData,
  player_loadIntoWorld
};
