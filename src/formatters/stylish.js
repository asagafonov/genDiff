import { isObject, stringify } from '../utils/utils.js';

const generateStylishDiff = (diff) => {
  const iter = (data, depth1, depth2) => data
    .reduce((acc, item) => {
      const { name, status, children } = item;
      const space = ' ';
      const indent1 = space.repeat(depth1);
      const indent2 = space.repeat(depth2);
      switch (status) {
        case 'unmodified':
          if (Array.isArray(children)) {
            return [...acc, [`${indent1}${name}: {\n${iter(children, depth1 + 4, depth2 + 4).join('\n')}\n${indent1}}`]];
          }
          return [...acc, [`${indent1}${name}: ${children}`]];
        case 'added':
          if (isObject(children)) {
            return [...acc, [`${indent2}+ ${name}: {${stringify(children)}}`]];
          }
          return [...acc, [`${indent2}+ ${name}: ${children}`]];
        case 'deleted':
          if (isObject(children)) {
            return [...acc, [`${indent2}- ${name}: {${stringify(children)}}`]];
          }
          return [...acc, [`${indent2}- ${name}: ${children}`]];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    }, []);
  return iter(diff, 4, 2);
};

export default (diff) => {
  const result = generateStylishDiff(diff);
  return `{\n${result.join('\n')}\n}`;
};
