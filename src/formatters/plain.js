import { isObject } from '../utils.js';

const displayPlainDiff = (diff) => {
  const iter = (data, path) => data
    .reduce((acc, item) => {
      const {
        name, status, children, oldChildren, newChildren,
      } = item;
      const newName = `${path}.${name}`;
      const isComplex = (property) => (isObject(property) ? '[complex value]' : property);
      switch (status) {
        case 'unmodified':
          if (Array.isArray(children)) {
            return [...acc, ...iter(children, newName)];
          }
          return [...acc, { name: newName, status, children: isComplex(children) }];
        case 'added':
          return [...acc, { name: newName, status, children: isComplex(children) }];
        case 'deleted':
          return [...acc, { name: newName, status, children: isComplex(children) }];
        case 'modified':
          return [...acc, {
            name: newName,
            status,
            oldChildren: isComplex(oldChildren),
            newChildren: isComplex(newChildren),
          }];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    }, []);
  return iter(diff, '');
};

export default (diff) => {
  const diffDisplay = displayPlainDiff(diff);
  const result = diffDisplay.flatMap((property) => {
    switch (property.status) {
      case 'added':
        return [`Property '${property.name.slice(1)}' was added with value '${property.children}'`];
      case 'deleted':
        return [`Property '${property.name.slice(1)}' was deleted`];
      case 'modified':
        return [`Property '${property.name.slice(1)}' was changed from '${property.oldChildren}' to '${property.newChildren}'`];
      default:
        return [];
    }
  });
  return result.sort().join('\n');
};
