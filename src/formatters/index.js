import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

export default (outputType, diff) => {
  switch (outputType) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};
