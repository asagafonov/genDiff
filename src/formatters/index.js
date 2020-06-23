import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

const chooseFormat = (format, diff) => {
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'json') {
    return json(diff);
  }
  return stylish(diff);
};

export default chooseFormat;
