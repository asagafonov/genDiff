const displayPlainDiff = (diff) => {
  const iter = (data, path) => data
    .reduce((acc, item) => {
      const {
        name, status, value, oldValue, newValue,
      } = item;
      const newName = `${path}.${name}`;

      const propertyType = (property) => (Array.isArray(property) ? '[complex value]' : property);

      switch (status) {
        case 'unmodified':
          if (Array.isArray(value)) {
            return [...acc, ...iter(value, newName)];
          }
          return [...acc, { name: newName, status, value: propertyType(value) }];
        case 'added':
          return [...acc, { name: newName, status, value: propertyType(value) }];
        case 'deleted':
          return [...acc, { name: newName, status, value: propertyType(value) }];
        case 'modified':
          return [...acc, {
            name: newName,
            status,
            oldValue: propertyType(oldValue),
            newValue: propertyType(newValue),
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
        return [`Property '${property.name.slice(1)}' was added with value '${property.value}'`];
      case 'deleted':
        return [`Property '${property.name.slice(1)}' was removed`];
      case 'modified':
        return [`Property '${property.name.slice(1)}' was updated. From '${property.oldValue}' to '${property.newValue}'`];
      default:
        return [];
    }
  });
  return result.sort().join('\n');
};
