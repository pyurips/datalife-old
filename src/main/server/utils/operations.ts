import authOperations from "../auth/index.js";
import characterOperations from "../character/index.js";

const operations = {
  ...authOperations,
  ...characterOperations
}

export default operations;