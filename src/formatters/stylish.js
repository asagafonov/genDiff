import { isObject } from '../utils/utils.js';

const stylish = (diff) => {
  const result = diff.reduce((acc, item) => {
    const { name, status, children } = item;
    if (status === 'unmodified') {
      if (isObject(children)) {
        return { ...acc, [`  ${name}`]: stylish([children]) };
      }
      if (Array.isArray(children)) {
        return { ...acc, [`  ${name}`]: stylish(children) };
      }
      return { ...acc, [`    ${name}`]: children };
    }
    if (status === 'added') {
      return { ...acc, [`  + ${name}`]: children };
    }
    if (status === 'deleted') {
      return { ...acc, [`  - ${name}`]: children };
    }
    return undefined;
  }, {});
  return result;
};


export default stylish;
