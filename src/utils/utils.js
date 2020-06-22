const isObject = (value) => (Object.prototype.toString.call(value) === '[object Object]');

const isUnique = (arr, obj) => {
  const name = obj.name;
  let counter = 0;
  arr.forEach((object) => {
    if (object.name === name) {
      counter += 1;
    }
  })
  return counter === 1 ? true : false;
};

export { isObject, isUnique };
