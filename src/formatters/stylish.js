const generateStylishDiff = (diff) => {
  const iter = (data, depth1, depth2) => data
    .map((item) => {
      const {
        name, status, value, oldValue, newValue,
      } = item;
      const space = ' ';
      const indent1 = space.repeat(depth1);
      const indent2 = space.repeat(depth2);

      const valueType = (property) => (Array.isArray(property) ? `{\n${iter(property, depth1 + 4, depth2 + 4).join('\n')}\n${indent1}}` : property);

      switch (status) {
        case 'unmodified':
          return [`${indent1}${name}: ${valueType(value)}`];
        case 'modified':
          return [`${indent2}- ${name}: ${valueType(oldValue)}\n${indent2}+ ${name}: ${valueType(newValue)}`];
        case 'added':
          return [`${indent2}+ ${name}: ${valueType(value)}`];
        case 'deleted':
          return [`${indent2}- ${name}: ${valueType(value)}`];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });
  return iter(diff, 4, 2);
};

export default (diff) => {
  const result = generateStylishDiff(diff);
  return `{\n${result.join('\n')}\n}`;
};
