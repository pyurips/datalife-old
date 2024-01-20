import { MongoClient, ObjectId } from 'mongodb';
import ICharacters from '../../models/characters.js';
import getEnvDb from '../../../env_db_handler.js';
import sendClientError from '../../../../utils/client_error.js';

async function getOneCharacter(userId: string) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string')) throw sendClientError(1705548166);
  const client = new MongoClient(URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
  });
  const database = client.db(getEnvDb());
  const collection = database.collection<ICharacters>('characters');

  try {
    const character = await collection.findOne({
      _id: new ObjectId(userId),
    });
    return {
      ...character,
      _id: character._id.toString()
    };
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1705548153);
  } finally {
    await client.close();
  }
}

export default getOneCharacter;
