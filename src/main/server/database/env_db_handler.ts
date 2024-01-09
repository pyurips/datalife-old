function getEnvDb() {
  if (process.env.NODE_ENV === 'development') return 'game_test';
  return 'game';
}

export default getEnvDb;
