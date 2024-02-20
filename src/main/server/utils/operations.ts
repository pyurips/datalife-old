import authOperations from '../auth/index.js';
import characterOperations from '../character/index.js';
import vehicleOperations from '../vehicle/index.js';

const operations = {
  ...authOperations,
  ...characterOperations,
  ...vehicleOperations,
};

export default operations;
