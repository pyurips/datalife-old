export function selectedDB() {
  if (process.env.NODE_ENV === 'development') return 'game_test';
  return 'game';
}

export enum gameCollectionsList {
  accounts = 'accounts',
  emailVerification = 'emailVerification',
}
