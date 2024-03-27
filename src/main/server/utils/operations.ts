import authOperations from '../auth/index.js';
import characterOperations from '../character/index.js';
import vehicleOperations from '../vehicle/index.js';
import adminOperations from '../admin/index.js';

const operations = {
  ...authOperations,
  ...characterOperations,
  ...vehicleOperations,
  ...adminOperations,
};

export default operations;
