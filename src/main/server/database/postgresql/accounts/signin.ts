import postegreClient from '../index.js';
import * as alt from 'alt-server';

async function accounts_signin(discord_id: string) {
  const client = postegreClient();
  try {
    await client.connect();
    const res = await client.query(
      `WITH ins AS (
        INSERT INTO accounts (discord_id)
        VALUES ($1)
        ON CONFLICT (discord_id) DO NOTHING
        RETURNING *
      )
      SELECT * FROM accounts WHERE discord_id = $1
      UNION ALL
      SELECT * FROM ins;`,
      [discord_id]
    );
    return res.rows[0];
  } catch (e) {
    return alt.logError(e);
  } finally {
    await client.end();
  }
}

export default accounts_signin;
