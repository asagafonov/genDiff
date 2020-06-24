import _ from 'lodash';
import { isObject, isUnique } from '../utils/utils.js';

const generatePlainDiff = (diff) => {
  const iter = (data, path) => data
    .reduce((acc, item) => {
      const { name, status, children } = item;
      const newName = `${path}.${name}`;
      if (status === 'unmodified') {
        if (Array.isArray(children)) {
          return [...acc, ...iter(children, newName)];
        }
        return [...acc, { name: newName, status, children }];
      }
      if (status === 'added' || status === 'deleted') {
        if (isObject(children)) {
          return [...acc, { name: newName, status, children: '[complex value]' }];
        }
        return [...acc, { name: newName, status, children }];
      }
      return undefined;
    }, []);
  return iter(diff, '');
};

export default (diff) => {
  const list = generatePlainDiff(diff);
  const unique = list.filter((element) => isUnique(list, element));
  const notUnique = list.filter((element) => !isUnique(list, element));
  const modified = [];
  for (let i = 0; i < notUnique.length; i += 2) {
    const { name, children: value1 } = notUnique[i];
    const { children: value2 } = notUnique[i + 1];
    modified.push({
      name,
      status: 'changed',
      value1,
      value2,
    });
  }
  const concat = _.concat(unique, modified);
  const result = concat.flatMap((property) => {
    if (property.status === 'added') {
      return [`Property '${property.name.slice(1)}' was added with value: '${property.children}'`];
    }
    if (property.status === 'deleted') {
      return [`Property '${property.name.slice(1)}' was deleted`];
    }
    if (property.status === 'changed') {
      return [`Property '${property.name.slice(1)}' was changed from '${property.value1}' to '${property.value2}'`];
    }
    return [];
  });
  return result.sort().join('\n');
};
