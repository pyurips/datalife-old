import pkg from 'pg';
import Utils from './utils.js';
const { Pool, Client } = pkg;

class Postgresql {
  private pool: pkg.Client;

  constructor() {
    this.pool = new Client({
      connectionString: process.env.POSTGRE_CONNECTION_STRING,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  public async getOneAccount(id: string) {
    const pool = this.pool;
    await pool.connect();
    try {
      const res = await pool.query('SELECT * from account WHERE id = $1', [id]);
      console.log('Resultado abaixo: ');
      console.log(res);
    } catch (e) {
      console.error(e);
    } finally {
      await pool.end();
    }
  }

  public async signinByAccount(discord_id: string) {
    const pool = this.pool;
    try {
      await pool.connect();
      const res = await pool.query<{
        discord_id: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        bits: number;
        permission_level: number;
        last_login: Date;
      }>(
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
    } catch (_) {
      throw Utils.sendClientError(1710900857);
    } finally {
      await pool.end();
    }
  }
}

export default Postgresql;
