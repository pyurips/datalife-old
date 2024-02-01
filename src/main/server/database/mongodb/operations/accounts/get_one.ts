import { MongoClient, ObjectId } from 'mongodb';
import IAccounts from '../../models/accounts.js';
import getEnvDb from '../../../env_db_handler.js';
import sendClientError from '../../../../utils/client_error.js';

async function getOneAccountOnDiscord(discordId: string) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string')) throw sendClientError(1705704309);
  const client = new MongoClient(URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
  });
  const database = client.db(getEnvDb());
  const collection = database.collection<IAccounts>('accounts');

  try {
    const user = await collection.findOne({
      discordId,
    });
    return {
      ...user,
      _id: user._id.toString()
    };
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1705704326);
  } finally {
    await client.close();
  }
}

export default getOneAccountOnDiscord;
