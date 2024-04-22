import * as alt from 'alt-server';
import { AccountData, CharacterData, ItemsType } from './types.js';
import { vehicle_createByWorld } from './vehicle.js';
import { sendClientError } from './utils.js';
import { checkPlayer } from './middlewares.js';
import { item_getItem } from './item.js';

export function player_setAccountData(player: alt.Player, data: AccountData) {
  if (!player?.valid) throw sendClientError(1713440472);
  player.setMeta('account', data);
}

export function player_setCharacterData(
  player: alt.Player,
  data: CharacterData
) {
  checkPlayer(player);
  player.setMeta('character', data);
}

export function player_getAccountData(player: alt.Player) {
  checkPlayer(player);
  return player.getMeta('account') as AccountData;
}

export function player_getCharacterData(player: alt.Player) {
  checkPlayer(player);
  const characterData = player.getMeta('character') as CharacterData;
  return {
    ...characterData,
    belongings: characterData.belongings.map((item) => {
      return {
        ...item,
        weight: item_getItem(item.id, item.type).weight * item.amount,
        usable: item.type === 'consumable',
      };
    }),
    currentWeight: characterData.belongings.reduce(
      (acc, i) => acc + item_getItem(i.id, i.type).weight * i.amount,
      0
    ),
  };
}

export function player_updateAccountData(
  player: alt.Player,
  data: Partial<AccountData>
) {
  checkPlayer(player);
  const account = player.getMeta('account') as AccountData;
  player_setAccountData(player, { ...account, ...data });
}

export function player_updateCharacterData(
  player: alt.Player,
  data: Partial<CharacterData>
) {
  checkPlayer(player);
  const character = player.getMeta('character') as CharacterData;
  player_setCharacterData(player, { ...character, ...data });
}

export function player_loadIntoWorld(player: alt.Player) {
  player_setAccountData(player, {
    _id: '5f9b1b3b7f1f3b0b3c1b1b3b',
    discordId: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    permissionLevel: 3,
    bits: 5065445,
  });

  player_setCharacterData(player, {
    health: 100,
    money: 1000,
    bank: 1000,
    level: 1,
    experience: { value: 0, rate: 0 },
    belongings: [
      {
        id: 0,
        type: 'consumable',
        quality: 0,
        amount: 5,
      },
      {
        id: 0,
        type: 'material',
        quality: 1,
        amount: 5,
      },
    ],
    weightCapacity: 100,
    hotkeysSlots: [],
    needs: {
      hunger: { value: 100, rate: 0.1 },
      thirst: { value: 100, rate: 0.1 },
      fatigue: { value: 100, rate: 0.1 },
      bathroom: { value: 100, rate: 0.1 },
      hygiene: { value: 100, rate: 0.1 },
    },
    conditions: [],
    skills: [],
    isLiving: true,
  });

  checkPlayer(player);
  player.spawn(-14.295, 24.695, 71.656);
  player.dimension = 0;
  setTimeout(() => {
    vehicle_createByWorld(player);
  }, 2000);
  setTimeout(() => {
    vehicle_createByWorld(player);
  }, 5000);
}

export function player_updateNeedsForAll() {
  alt.Player.all.forEach((player) => {
    checkPlayer(player);
    const characterData = player_getCharacterData(player);
    if (!(characterData && characterData.isLiving)) return;
    const characterNeeds = characterData.needs;
    const newNeeds: typeof characterNeeds = {
      thirst: {
        value:
          characterNeeds.thirst.value - characterNeeds.thirst.rate < 0
            ? 0
            : characterNeeds.thirst.value - characterNeeds.thirst.rate,
        rate: characterNeeds.thirst.rate,
      },
      hunger: {
        value:
          characterNeeds.hunger.value - characterNeeds.hunger.rate < 0
            ? 0
            : characterNeeds.hunger.value - characterNeeds.hunger.rate,
        rate: characterNeeds.hunger.rate,
      },
      fatigue: {
        value:
          characterNeeds.fatigue.value - characterNeeds.fatigue.rate < 0
            ? 0
            : characterNeeds.fatigue.value - characterNeeds.fatigue.rate,
        rate: characterNeeds.fatigue.rate,
      },
      bathroom: {
        value:
          characterNeeds.bathroom.value - characterNeeds.bathroom.rate < 0
            ? 0
            : characterNeeds.bathroom.value - characterNeeds.bathroom.rate,
        rate: characterNeeds.bathroom.rate,
      },
      hygiene: {
        value:
          characterNeeds.hygiene.value - characterNeeds.hygiene.rate < 0
            ? 0
            : characterNeeds.hygiene.value - characterNeeds.hygiene.rate,
        rate: characterNeeds.hygiene.rate,
      },
    };
    player_updateCharacterData(player, { needs: newNeeds });
  });
}

export function player_addItemToBelongings(
  player: alt.Player,
  itemId: number,
  type: ItemsType,
  amount: number,
  quality: 0 | 1 | 2
) {
  checkPlayer(player);
  const characterBelongings = player_getCharacterData(player).belongings;
  const item = item_getItem(itemId, type);
  if (!item.stackable) {
    for (let i = 0; i < amount; i++) {
      player_updateCharacterData(player, {
        belongings: [
          ...characterBelongings,
          { id: itemId, type, quality, amount: 1 },
        ],
      });
    }
    return;
  }
  const ownedItem = characterBelongings.find(
    (i) => i.id === itemId && i.type === type && i.quality === quality
  );
  if (ownedItem)
    return player_updateCharacterData(player, {
      belongings: [
        ...characterBelongings,
        { id: itemId, type, quality, amount: ownedItem.amount + amount },
      ],
    });
  return player_updateCharacterData(player, {
    belongings: [...characterBelongings, { id: itemId, type, quality, amount }],
  });
}

export const callableByRPC = {
  player_getAccountData,
  player_loadIntoWorld,
  player_getCharacterData,
};
