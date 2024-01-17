type IAccounts = {
  discordId: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastLogin: Date | null;
  permissionLevel: number;
  inGame: boolean;
  prime: Date | null;
  bits: number;
  supporterPackage: 'Patrocinador(a)' | 'Chefia' | 'Magnata' | null;
};

export default IAccounts;
