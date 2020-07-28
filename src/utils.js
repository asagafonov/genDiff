const isObject = (value) => (Object.prototype.toString.call(value) === '[object Object]');

const stringify = (object) => {
  const entries = Object.entries(object);
  const stringified = entries.map((element) => {
    const [key, value] = element;
    return [`{ ${key}: ${value} }`];
  });
  return stringified.join('\n');
};

const digitsOnly = (string) => [...string].every((letter) => '0123456789'.includes(letter));

const fixIniParser = (obj) => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, element) => {
    const [key, value] = element;
    if (isObject(value)) {
      return { ...acc, [key]: fixIniParser(value) };
    }
    if (typeof value === 'string') {
      if (digitsOnly(value)) {
        return { ...acc, [key]: Number(value) };
      }
    }
    return { ...acc, [key]: value };
  }, {});
};

export {
  isObject,
  stringify,
  fixIniParser,
};
