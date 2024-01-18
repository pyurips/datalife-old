import { MongoClient, ObjectId } from 'mongodb';
import ICharacters from '../../models/characters.js';
import getEnvDb from '../../../env_db_handler.js';
import sendClientError from '../../../../utils/client_error.js';

async function createOneCharacter(userId: string, characterData: any) {
  const URI = process.env.MONGO_DB_KEY;
  if (!URI || !(typeof URI === 'string')) return sendClientError(1705548166);
  const client = new MongoClient(URI, {
    minPoolSize: 1,
    maxPoolSize: 10,
  });
  const database = client.db(getEnvDb());
  const collection = database.collection<ICharacters>('characters');

  try {
    const result = await client.withSession(async (session) =>
      session
        .withTransaction(async (session) => {
          const character = await collection.findOne(
            {
              _id: new ObjectId(userId),
            },
            {
              session,
            }
          );

          if (character) return sendClientError(1705550095);

          const createdCharacter = await collection.insertOne(
            {
              _id: new ObjectId(userId),
              name: characterData.name,
              createdAt: new Date(),
            },
            {
              session,
            }
          );

          return createdCharacter;
        })
        .finally(async () => await client.close())
    );
    if (!result) return sendClientError(1705550299);
    return result;
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    return sendClientError(1705550397);
  } finally {
    await client.close();
  }
}

export default createOneCharacter;
