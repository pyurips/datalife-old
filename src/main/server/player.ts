import * as alt from 'alt-server';
import { AccountData, CharacterData } from './types.js';
import { sendClientError } from './utils.js';

export function player_setAccountData(player: alt.Player, data: AccountData) {
  if (!player?.valid) throw sendClientError(1713440472);
  player.setMeta('account', data);
}

export function player_setCharacterData(
  player: alt.Player,
  data: CharacterData
) {
  if (!player?.valid) throw sendClientError(1713440477);
  player.setMeta('character', data);
}

export function player_getAccountData(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440487);
  return player.getMeta('account') as AccountData;
}

export function player_getCharacterData(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440492);
  return player.getMeta('character') as CharacterData;
}

export function player_updateAccountData(
  player: alt.Player,
  data: Partial<AccountData>
) {
  if (!player?.valid) throw sendClientError(1713440429);
  const account = player.getMeta('account') as AccountData;
  player_setAccountData(player, { ...account, ...data });
}

export function player_updateCharacterData(
  player: alt.Player,
  data: Partial<CharacterData>
) {
  if (!player?.valid) throw sendClientError(1713440417);
  const character = player.getMeta('character') as CharacterData;
  player_setCharacterData(player, { ...character, ...data });
}

export function player_loadIntoWorld(player: alt.Player) {
  if (!player?.valid) throw sendClientError(1713440399);
  player.spawn(-14.295, 24.695, 71.656);
  player.dimension = 0;
}

export const callableByRPC = {
  player_getAccountData,
  player_getCharacterData,
  player_loadIntoWorld,
};
