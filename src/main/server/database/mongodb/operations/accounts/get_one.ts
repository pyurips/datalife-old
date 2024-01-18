import { MongoClient, ObjectId } from 'mongodb';
import IAccounts from '../../models/accounts.js';
import getEnvDb from '../../../env_db_handler.js';

const DEFAULT_ERROR_MESSAGE =
  'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.';

async function getOneAccount(userId: string) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string'))
    return {
      data: null,
      status: 500,
      error: {
        message: DEFAULT_ERROR_MESSAGE,
        internalCode: 1704484092,
      },
    };
  const client = new MongoClient(URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
  });
  const database = client.db(getEnvDb());
  const collection = database.collection<IAccounts>('accounts');

  try {
    const user = await collection.findOne(
      {
        _id: new ObjectId(userId),
      },
      {
        projection: {
          _id: 0,
          email: 1,
          twoFA: 1,
          permissionLevel: 1,
          inGame: 1,
          prime: 1,
          bits: 1,
          supporterPackages: 1,
        },
      }
    );
    if (!user)
      return {
        data: null,
        status: 500,
        error: {
          message:
            'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.',
          internalCode: 1704484537,
        },
      };

    return {
      data: user,
      status: 200,
      error: null,
    };
  } catch (_) {
    return {
      data: null,
      status: 500,
      error: {
        message:
          'Desculpe, ocorreu um erro interno no servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema. Por favor, tente novamente mais tarde.',
        internalCode: 1704484570,
      },
    };
  } finally {
    await client.close();
  }
}

export default getOneAccount;
