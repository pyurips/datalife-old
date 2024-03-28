import characterOperations from '../character/index.js';
import authOperations from '../auth/index.js';
import adminOperations from '../admin/index.js';
import accountOperations from '../account/index.js';

const operations = {
  ...characterOperations,
  ...authOperations,
  ...adminOperations,
  ...accountOperations,
};

export default operations;
