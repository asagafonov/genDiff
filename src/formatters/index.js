import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

const chooseFormat = (format, diff) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};

export default chooseFormat;
