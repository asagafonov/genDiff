import { isObject } from '../utils/utils.js';

const json = (diff) => {
  const result = diff.reduce((acc, item) => {
    const { name, status, children } = item;
    if (status === 'unmodified') {
      if (isObject(children)) {
        return { ...acc, [`  ${name}`]: json([children]) };
      }
      if (Array.isArray(children)) {
        return { ...acc, [`  ${name}`]: json(children) };
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
  return JSON.stringify(result, null, ' ');
};


export default json;
