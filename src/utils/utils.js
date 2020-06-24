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

export { isObject, isUnique, stringify };
