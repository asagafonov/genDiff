import _ from 'lodash';
import { isObject, isUnique, combineObjects } from '../utils.js';

const generatePlainDiff = (diff) => {
  const iter = (data, path) => data
    .reduce((acc, item) => {
      const { name, status, children } = item;
      const newName = `${path}.${name}`;
      switch (status) {
        case 'unmodified':
          if (Array.isArray(children)) {
            return [...acc, ...iter(children, newName)];
          }
          return [...acc, { name: newName, status, children }];
        case 'added':
          if (isObject(children)) {
            return [...acc, { name: newName, status, children: '[complex value]' }];
          }
          return [...acc, { name: newName, status, children }];
        case 'deleted':
          if (isObject(children)) {
            return [...acc, { name: newName, status, children: '[complex value]' }];
          }
          return [...acc, { name: newName, status, children }];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    }, []);
  return iter(diff, '');
};

export default (diff) => {
  const list = generatePlainDiff(diff);
  const unique = list.filter((element) => isUnique(list, element));
  const notUnique = list.filter((element) => !isUnique(list, element));
  const modified = combineObjects(notUnique);
  const concat = _.concat(unique, modified);
  const result = concat.flatMap((property) => {
    switch (property.status) {
      case 'added':
        return [`Property '${property.name.slice(1)}' was added with value '${property.children}'`];
      case 'deleted':
        return [`Property '${property.name.slice(1)}' was deleted`];
      case 'changed':
        return [`Property '${property.name.slice(1)}' was changed from '${property.value1}' to '${property.value2}'`];
      default:
        return [];
    }
  });
  return result.sort().join('\n');
};
