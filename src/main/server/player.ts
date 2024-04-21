import * as alt from 'alt-server';
import { AccountData, CharacterData } from './types.js';
import { vehicle_createByWorld } from './vehicle.js';
import { sendClientError } from './utils.js';
import { checkPlayer } from './middlewares.js';

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
  setTimeout(() => {
    vehicle_createByWorld(player);
  }, 2000);
}

export function player_updateNeedsForAll() {
  alt.Player.all.forEach((player) => {
    checkPlayer(player);
    const characterNeeds = player_getCharacterData(player).needs;
    const newNeeds: typeof characterNeeds = {
      thirst: {
        value: characterNeeds.thirst.value - characterNeeds.thirst.rate,
        rate: characterNeeds.thirst.rate,
      },
      hunger: {
        value: characterNeeds.hunger.value - characterNeeds.hunger.rate,
        rate: characterNeeds.hunger.rate,
      },
      fatigue: {
        value: characterNeeds.fatigue.value - characterNeeds.fatigue.rate,
        rate: characterNeeds.fatigue.rate,
      },
      bathroom: {
        value: characterNeeds.bathroom.value - characterNeeds.bathroom.rate,
        rate: characterNeeds.bathroom.rate,
      },
      hygiene: {
        value: characterNeeds.hygiene.value - characterNeeds.hygiene.rate,
        rate: characterNeeds.hygiene.rate,
      },
    };
    player_updateCharacterData(player, { needs: newNeeds });
  });
}

export const callableByRPC = {
  player_getAccountData,
  player_loadIntoWorld,
};
