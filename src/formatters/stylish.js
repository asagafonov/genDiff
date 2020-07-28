import { isObject, stringify } from '../utils.js';

const generateStylishDiff = (diff) => {
  const iter = (data, depth1, depth2) => data
    .reduce((acc, item) => {
      const {
        name, status, children, oldChildren, newChildren,
      } = item;
      const space = ' ';
      const indent1 = space.repeat(depth1);
      const indent2 = space.repeat(depth2);
      const stringifyChildren = (property) => (isObject(property) ? stringify(property) : property);
      switch (status) {
        case 'unmodified':
          if (Array.isArray(children)) {
            return [...acc, [`${indent1}${name}: {\n${iter(children, depth1 + 4, depth2 + 4).join('\n')}\n${indent1}}`]];
          }
          return [...acc, [`${indent1}${name}: ${children}`]];
        case 'modified':
          return [...acc, [`${indent2}- ${name}: ${stringifyChildren(oldChildren)}`], [`${indent2}+ ${name}: ${stringifyChildren(newChildren)}`]];
        case 'added':
          return [...acc, [`${indent2}+ ${name}: ${stringifyChildren(children)}`]];
        case 'deleted':
          return [...acc, [`${indent2}- ${name}: ${stringifyChildren(children)}`]];
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
