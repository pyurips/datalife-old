import * as alt from 'alt-server';
import { AccountData, CharacterData, ItemsType } from '../shared/types.js';
import { sendClientError } from './utils.js';
import { checkPlayer } from './middlewares.js';
import { item_createAObjectDropFromPlayer, item_getItem } from './item.js';

export function player_setAccountData(player: alt.Player, data: AccountData) {
  if (!player?.valid) throw sendClientError(1713440472);
  player.setLocalMeta('account', data);
}

export function player_setCharacterData(
  player: alt.Player,
  data: CharacterData
) {
  checkPlayer(player);
  const dataWithWeight = {
    ...data,
    belongings: data.belongings.map((item) => {
      return {
        ...item,
        weight: +(
          item_getItem(item.id, item.type).weight * item.amount
        ).toFixed(1),
        usable: item.type === 'consumable',
      };
    }),
    currentWeight: +data.belongings
      .reduce((acc, i) => acc + item_getItem(i.id, i.type).weight * i.amount, 0)
      .toFixed(1),
  };
  player.setStreamSyncedMeta('character', dataWithWeight);
}

export function player_getAccountData(player: alt.Player) {
  checkPlayer(player);
  return player.getLocalMeta('account') as AccountData;
}

export function player_getCharacterData(player: alt.Player) {
  checkPlayer(player);
  return player.getStreamSyncedMeta('character') as CharacterData;
}

export function player_updateAccountData(
  player: alt.Player,
  data: Partial<AccountData>
) {
  checkPlayer(player);
  const account = player.getLocalMeta('account') as AccountData;
  player_setAccountData(player, { ...account, ...data });
}

export function player_updateCharacterData(
  player: alt.Player,
  data: Partial<CharacterData>
) {
  checkPlayer(player);
  const character = player.getStreamSyncedMeta('character') as CharacterData;
  player_setCharacterData(player, { ...character, ...data });
}

export function player_updateNeedsForAll() {
  alt.Player.all.forEach((player) => {
    try {
      checkPlayer(player);
    } catch (_) {
      return;
    }
    const characterData = player_getCharacterData(player);
    if (!characterData) return;
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
  if (ownedItem) {
    ownedItem.amount += amount;

    return player_updateCharacterData(player, {
      belongings: characterBelongings,
    });
  }
  return player_updateCharacterData(player, {
    belongings: [...characterBelongings, { id: itemId, type, quality, amount }],
  });
}

export function player_removeBelongingsItem(
  player: alt.Player,
  itemId: number,
  type: ItemsType,
  quality: 0 | 1 | 2,
  amount: number
) {
  checkPlayer(player);
  const characterBelongings = player_getCharacterData(player).belongings;
  const itemToDelete = characterBelongings.find(
    (i) => i.id === itemId && i.quality === quality && i.type === type
  );
  if (!itemToDelete) throw sendClientError(1713879613);
  const finalAmount = itemToDelete.amount - amount;
  if (finalAmount <= 0)
    return player_updateCharacterData(player, {
      belongings: characterBelongings.filter(
        (i) => i.id !== itemId || i.quality !== quality || i.type !== type
      ),
    });
  return player_updateCharacterData(player, {
    belongings: characterBelongings.map((i) =>
      i.id === itemId && i.quality === quality && i.type === type
        ? { ...i, amount: finalAmount }
        : i
    ),
  });
}

export function player_loadRPCs() {
  alt.onRpc(
    'player_dropBelongingsItem',
    (player, data: { index: number; amount: number }) => {
      checkPlayer(player);
      const characterBelongings = player_getCharacterData(player).belongings;
      const itemToDelete = characterBelongings[data.index];
      if (!itemToDelete) throw sendClientError(1713879613);
      const finalAmount = itemToDelete.amount - data.amount;
      if (finalAmount <= 0) {
        item_createAObjectDropFromPlayer(player, {
          itemId: itemToDelete.id,
          type: itemToDelete.type,
          quality: itemToDelete.quality,
          amount: itemToDelete.amount,
        });
        return player_updateCharacterData(player, {
          belongings: characterBelongings.filter(
            (i, idx) => idx !== data.index
          ),
        });
      }
      item_createAObjectDropFromPlayer(player, {
        itemId: itemToDelete.id,
        type: itemToDelete.type,
        quality: itemToDelete.quality,
        amount: data.amount,
      });
      return player_updateCharacterData(player, {
        belongings: characterBelongings.map((i, idx) =>
          idx === data.index ? { ...i, amount: finalAmount } : i
        ),
      });
    }
  );

  alt.onRpc(
    'player_setAnimationByStaff',
    (
      player,
      data: {
        animDict: string;
        animName: string;
        blendInSpeed?: number;
        blendOutSpeed?: number;
        duration?: number;
        flags?: number;
        playbackRate?: number;
        lockX?: boolean;
        lockY?: boolean;
        lockZ?: boolean;
      }
    ) => {
      checkPlayer(player, 2);
      player.playAnimation(
        data.animDict,
        data.animName,
        data.blendInSpeed,
        data.blendOutSpeed,
        data.duration,
        data.flags,
        data.playbackRate,
        data.lockX,
        data.lockY,
        data.lockZ
      );
    }
  );

  alt.onRpc('player_loadIntoWorld', (player) => {
    player_setAccountData(player, {
      _id: '5f9b1b3b7f1f3b0b3c1b1b3b',
      discordId: '1234567890',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date(),
      permissionLevel: 3,
    });

    player_setCharacterData(player, {
      _id: '5f9b1b3b7f1f3b0b3c1b1b3b',
      name: 'Pabliuri',
      health: 100,
      stamina: 100,
      money: 1000,
      bank: 1000,
      level: 1,
      experience: { value: 0, rate: 1 },
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
    });

    checkPlayer(player);
    player.spawn(-14.295, 24.695, 71.656);
    player.dimension = 0;
  });
}

export function player_addToHungerNeeds(player: alt.Player, amount: number) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newHunger = characterData.needs.hunger.value + amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      hunger: {
        ...characterData.needs.hunger,
        value: newHunger > 100 ? 100 : newHunger,
      },
    },
  });
}

export function player_addToThirstNeeds(player: alt.Player, amount: number) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newThirst = characterData.needs.thirst.value + amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      thirst: {
        ...characterData.needs.thirst,
        value: newThirst > 100 ? 100 : newThirst,
      },
    },
  });
}

export function player_addToFatigueNeeds(player: alt.Player, amount: number) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newFatigue = characterData.needs.fatigue.value + amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      fatigue: {
        ...characterData.needs.fatigue,
        value: newFatigue > 100 ? 100 : newFatigue,
      },
    },
  });
}

export function player_addToBathroomNeeds(player: alt.Player, amount: number) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newBathroom = characterData.needs.bathroom.value + amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      bathroom: {
        ...characterData.needs.bathroom,
        value: newBathroom > 100 ? 100 : newBathroom,
      },
    },
  });
}

export function player_addToHygieneNeeds(player: alt.Player, amount: number) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newHygiene = characterData.needs.hygiene.value + amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      hygiene: {
        ...characterData.needs.hygiene,
        value: newHygiene > 100 ? 100 : newHygiene,
      },
    },
  });
}

export function player_removeFromHungerNeeds(
  player: alt.Player,
  amount: number
) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newHunger = characterData.needs.hunger.value - amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      hunger: {
        ...characterData.needs.hunger,
        value: newHunger < 0 ? 0 : newHunger,
      },
    },
  });
}

export function player_removeFromThirstNeeds(
  player: alt.Player,
  amount: number
) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newThirst = characterData.needs.thirst.value - amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      thirst: {
        ...characterData.needs.thirst,
        value: newThirst < 0 ? 0 : newThirst,
      },
    },
  });
}

export function player_removeFromFatigueNeeds(
  player: alt.Player,
  amount: number
) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newFatigue = characterData.needs.fatigue.value - amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      fatigue: {
        ...characterData.needs.fatigue,
        value: newFatigue < 0 ? 0 : newFatigue,
      },
    },
  });
}

export function player_removeFromBathroomNeeds(
  player: alt.Player,
  amount: number
) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const newBathroom = characterData.needs.bathroom.value - amount;
  player_updateCharacterData(player, {
    needs: {
      ...characterData.needs,
      bathroom: {
        ...characterData.needs.bathroom,
        value: newBathroom < 0 ? 0 : newBathroom,
      },
    },
  });
}
