import characterOperations from '../character/index.js';
import authOperations from '../auth/index.js';
import adminOperations from '../admin/index.js';

const operations = {
  ...characterOperations,
  ...authOperations,
  ...adminOperations,
};

export default operations;
