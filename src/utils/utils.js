const isObject = (value) => (Object.prototype.toString.call(value) === '[object Object]');

export default isObject;
