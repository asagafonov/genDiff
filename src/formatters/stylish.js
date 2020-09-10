import _ from 'lodash';

const expand = (val) => {
  if (!_.isObject(val)) {
    return val;
  }
  const keys = _.keys(val);
  return keys.map((key) => {
    if (!_.isObject(val[key])) {
      return { name: key, status: 'unknown', children: val[key] };
    }
    return { name: key, status: 'unknown', children: expand(val[key]) };
  });
};

export default (diff) => {
  const iter = (data, depth) => data
    .flatMap((item) => {
      const {
        name, status, value, children, oldValue, newValue,
      } = item;
      const space = ' ';
      const initialIndent1 = space.repeat(4);
      const initialIndent2 = space.repeat(2);
      const indent1 = initialIndent1 + space.repeat(depth * 4);
      const indent2 = initialIndent2 + space.repeat(depth * 4);

      const chooseIndent = (m) => (Array.isArray(m) ? `{\n${iter(m, depth + 1).join('\n')}\n${indent1}}` : m);

      const formatValue = (val) => chooseIndent(expand(val));

      switch (status) {
        case 'added':
          return `${indent2}+ ${name}: ${formatValue(value)}`;
        case 'deleted':
          return `${indent2}- ${name}: ${formatValue(value)}`;
        case 'unknown':
          return `${indent1}${name}: ${chooseIndent(children)}`;
        case 'unmodified':
          return `${indent1}${name}: ${formatValue(value)}`;
        case 'modified':
          return [
            `${indent2}- ${name}: ${formatValue(oldValue)}`,
            `${indent2}+ ${name}: ${formatValue(newValue)}`,
          ];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });
  return `{\n${iter(diff, 0).join('\n')}\n}`;
};
