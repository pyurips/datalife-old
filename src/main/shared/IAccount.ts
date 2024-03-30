type IAccount = {
  id: string;
  name: string;
  discord_id: string;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
  permission_level: number;
  bits: number;
  in_game: boolean;
}

export default IAccount;