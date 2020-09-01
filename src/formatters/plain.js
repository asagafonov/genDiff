import _ from 'lodash';

const formatDiffAsPlain = (diff) => {
  const iter = (data, path) => data
    .reduce((acc, item) => {
      const {
        name, status, value, oldValue, newValue,
      } = item;
      const newPath = `${path}.${name}`;

      const chooseValType = (n) => (_.isObject(n) ? '[complex value]' : n);

      switch (status) {
        case 'added':
          return [...acc, { name: newPath, status, value: chooseValType(value) }];
        case 'deleted':
          return [...acc, { name: newPath, status }];
        case 'unknown':
          return [...acc, ...iter(value, newPath)];
        case 'unmodified':
          return [...acc];
        case 'modified':
          return [...acc, {
            name: newPath,
            status,
            oldValue: chooseValType(oldValue),
            newValue: chooseValType(newValue),
          }];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    }, []);
  return iter(diff, '');
};

export default (diff) => {
  const plainDiff = formatDiffAsPlain(diff);
  const result = plainDiff.flatMap((property) => {
    switch (property.status) {
      case 'added':
        return [`Property '${property.name.slice(1)}' was added with value '${property.value}'`];
      case 'deleted':
        return [`Property '${property.name.slice(1)}' was removed`];
      case 'modified':
        return [`Property '${property.name.slice(1)}' was updated from '${property.oldValue}' to '${property.newValue}'`];
      default:
        return [];
    }
  });
  return result.sort().join('\n');
};
