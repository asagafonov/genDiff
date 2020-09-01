import _ from 'lodash';

const expand = (val) => {
  if (!_.isObject(val)) {
    return val;
  }
  const keys = _.keys(val);
  return keys.map((key) => {
    if (!_.isObject(val[key])) {
      return { name: key, status: 'unknown', value: val[key] };
    }
    return { name: key, status: 'unknown', value: expand(val[key]) };
  });
};

const formatDiffAsStylish = (diff) => {
  const iter = (data, depth1, depth2) => data
    .map((item) => {
      const {
        name, status, value, oldValue, newValue,
      } = item;
      const space = ' ';
      const indent1 = space.repeat(depth1);
      const indent2 = space.repeat(depth2);

      const chooseIndent = (m) => (Array.isArray(m) ? `{\n${iter(m, depth1 + 4, depth2 + 4).join('\n')}\n${indent1}}` : m);

      const formatValue = (val) => chooseIndent(expand(val));

      switch (status) {
        case 'added':
          return [`${indent2}+ ${name}: ${formatValue(value)}`];
        case 'deleted':
          return [`${indent2}- ${name}: ${formatValue(value)}`];
        case 'unknown':
          return [`${indent1}${name}: ${chooseIndent(value)}`];
        case 'unmodified':
          return [`${indent1}${name}: ${formatValue(value)}`];
        case 'modified':
          return [`${indent2}- ${name}: ${formatValue(oldValue)}\n${indent2}+ ${name}: ${formatValue(newValue)}`];
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });
  return iter(diff, 4, 2);
};

export default (diff) => {
  const stylishDiff = formatDiffAsStylish(diff);
  return `{\n${stylishDiff.join('\n')}\n}`;
};
