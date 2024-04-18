import * as alt from 'alt-server';
import { AccountData, CharacterData } from './types.js';

export function player_setAccountData(player: alt.Player, data: AccountData) {
  if (!player?.valid) throw new Error();
  player.setMeta('account', data);
}

export function player_setCharacterData(player: alt.Player, data: CharacterData) {
  if (!player?.valid) throw new Error();
  player.setMeta('character', data);
}

export function player_getPermissionLevel(player: alt.Player) {
  if (!player?.valid) throw new Error();
  const account = player.getMeta('account') as AccountData;
  return account.permissionLevel;
}

export function player_getAccountData(player: alt.Player) {
  if (!player?.valid) throw new Error();
  return player.getMeta('account') as AccountData;
}

export function player_getCharacterData(player: alt.Player) {
  if (!player?.valid) throw new Error();
  return player.getMeta('character') as CharacterData;
}

export function player_updateAccountData(
  player: alt.Player,
  data: Partial<AccountData>
) {
  if (!player?.valid) throw new Error();
  const account = player.getMeta('account') as AccountData;
  player_setAccountData(player, { ...account, ...data });
}

export function player_updateCharacterData(
  player: alt.Player,
  data: Partial<CharacterData>
) {
  if (!player?.valid) throw new Error();
  const character = player.getMeta('character') as CharacterData;
  player_setCharacterData(player, { ...character, ...data });
}

export const callableByRPC = {
  player_getAccountData,
  player_getCharacterData,
};
