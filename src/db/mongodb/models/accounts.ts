type IAccounts = {
  email: string;
  twoFA: boolean;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastLogin: Date | null;
  permissionLevel: number;
  inGame: boolean;
  prime: Date | null;
  bits: number;
  supporterPackages: 'Patrocinador(a)' | 'Chefia' | 'Magnata' | null;
};

export default IAccounts;
