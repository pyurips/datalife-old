import { Schema, model, createConnection, Connection } from 'mongoose';
import { AccountData, CharacterData } from './types.js';

export let mongoDBCoreInstance: Connection = null;
export let mongoDBGameInstance: Connection = null;

const accountSchema = new Schema<AccountData>({
  id: { type: String, required: true },
  discordId: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  lastLogin: { type: Date, required: true },
  permissionLevel: { type: Number, required: true },
  bits: { type: Number, required: true },
});

const characterSchema = new Schema<CharacterData>({
  health: { type: Number, required: true },
  money: { type: Number, required: true },
  bank: { type: Number, required: true },
  level: { type: Number, required: true },
  experience: { type: Number, required: true },
  belongings: {
    type: [
      {
        id: Number,
        type: String,
        quality: Number,
        amount: Number,
      },
    ],
    required: true,
  },
  weightCapacity: { type: Number, required: true },
  hotkeysSlots: {
    type: [
      {
        id: Number,
        slot: Number,
      },
    ],
    required: true,
  },
  needs: { type: Object, required: true },
  conditions: {
    type: [
      {
        id: Number,
        level: Number,
        rate: Number,
      },
    ],
    required: true,
  },
  skills: {
    type: [
      {
        id: Number,
        level: Number,
        experience: Number,
        rate: Number,
      },
    ],
    required: true,
  },
});

export const accountModel = model<AccountData>('accounts', accountSchema);
export const characterModel = model<CharacterData>(
  'characters',
  characterSchema
);

export function initializeMongoDBCore() {
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoDBCoreInstance = createConnection(MONGODB_URI);
  mongoDBCoreInstance.useDb('core');
}

export function initializeMongoDBGame() {
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoDBGameInstance = createConnection(MONGODB_URI);

  if (process.env.NODE_ENV === 'development') {
    mongoDBGameInstance.useDb('game_server_test');
  }

  const SELECTED_GAME_SERVER = process.env.SELECTED_GAME_SERVER;
  if (SELECTED_GAME_SERVER === '1') {
    mongoDBGameInstance.useDb('game_server_1');
  }
  if (SELECTED_GAME_SERVER === '2') {
    mongoDBGameInstance.useDb('game_server_2');
  }
}
