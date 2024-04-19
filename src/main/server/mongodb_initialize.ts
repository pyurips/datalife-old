import { Schema, model, connect, Connection } from 'mongoose';
import { AccountData, CharacterData } from './types.js';

let mongoDBCoreInstance: Connection;
let mongoDBGameInstance: Connection;

const accountSchema = new Schema<AccountData>({
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

export async function initializeMongoDB() {
  const MONGODB_CORE_URI = process.env.MONGODB_CORE_URI;
  if (!MONGODB_CORE_URI) throw new Error('MONGODB_URI is not set');
  mongoDBCoreInstance = (await connect(MONGODB_CORE_URI)).connection;
}

export async function initializeMongoDBGame() {
  const NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV) throw new Error('NODE_ENV is not set');
  if (NODE_ENV === 'development') {
    const MONGODB_GAME_SERVER_TEST_URI =
      process.env.MONGODB_GAME_SERVER_TEST_URI;
    if (!MONGODB_GAME_SERVER_TEST_URI)
      throw new Error('MONGODB_GAME_SERVER_TEST_URI is not set');
    mongoDBGameInstance = (await connect(MONGODB_GAME_SERVER_TEST_URI))
      .connection;
    return;
  }

  const SELECTED_GAME_SERVER = process.env.SELECTED_GAME_SERVER;
  if (!SELECTED_GAME_SERVER) throw new Error('SELECTED_GAME_SERVER is not set');
  const MONGODB_GAME_SERVER_URI =
    process.env[`MONGODB_GAME_SERVER_${SELECTED_GAME_SERVER}_URI`];
  mongoDBGameInstance = (await connect(MONGODB_GAME_SERVER_URI)).connection;
}
