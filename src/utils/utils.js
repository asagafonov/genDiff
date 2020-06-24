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
  const digitsOnly = (string) => [...string].every(letter => '0123456789'.includes(letter));
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

export { isObject, isUnique, stringify, fixIniParser };
