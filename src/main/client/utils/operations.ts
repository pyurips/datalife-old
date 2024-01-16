import characterOperations from '../character/index.js';
import authOperations from '../auth/index.js';

const operations = {
  ...characterOperations,
  ...authOperations
};

export default operations;
