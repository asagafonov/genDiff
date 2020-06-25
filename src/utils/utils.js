import _ from 'lodash';

const isObject = (value) => (Object.prototype.toString.call(value) === '[object Object]');

const isUnique = (arr, obj) => {
  const { name } = obj;
  let counter = 0;
  arr.forEach((object) => {
    if (object.name === name) {
      counter += 1;
    }
  });
  return counter === 1;
};

const stringify = (object) => {
  const entries = Object.entries(object);
  const stringified = entries.map((element) => {
    const [key, value] = element;
    return [` ${key}: ${value} `];
  });
  return stringified.join('\n');
};

const fixIniParser = (object) => {
  const digitsOnly = (string) => [...string].every((letter) => '0123456789'.includes(letter));
  const entries = Object.entries(object);
  const fixed = entries.map((item) => {
    const [key, value] = item;
    if (typeof value === 'string') {
      return digitsOnly(value) ? [key, Number(value)] : [key, value];
    }
    return [key, value];
  });
  const result = fixed.reduce((acc, item) => {
    const [key, value] = item;
    return { ...acc, [key]: value };
  }, {});
  return result;
};

const combineObjects = (list) => {
  const iter = (elements, acc) => {
    if (elements.length < 2) {
      return [];
    }
    const [first, second, ...rest] = elements;
    const { name, children: value1 } = first;
    const { children: value2 } = second;
    const element = {
      name,
      status: 'changed',
      value1,
      value2,
    };
    if (elements.length === 2) {
      return [...acc, element];
    }
    return [...acc, element, ...iter(rest, [])];
  };
  return _.uniqWith(iter(list, []), _.isEqual);
};

export {
  isObject,
  isUnique,
  stringify,
  fixIniParser,
  combineObjects,
};
