import { isObject } from '../utils/utils.js';

const json = (diff) => {
  return `"${JSON.stringify(diff)}"`;
};

export default json;
