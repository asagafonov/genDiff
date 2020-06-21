import _ from 'lodash';
import parseFile from './parsers/parsers.js';
import isObject from './utils/utils.js';

const deconstructObject = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq(_.concat(keys1, keys2).sort());
  const list = keys.flatMap((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { name: key, status: 'deleted', children: file1[key] };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { name: key, status: 'added', children: file2[key] };
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      if (!isObject(file1[key]) || !isObject(file2[key])) {
        if (file1[key] === file2[key]) {
          return { name: key, status: 'unmodified', children: file1[key] };
        }
        return [{ name: key, status: 'deleted', children: file1[key] }, { name: key, status: 'added', children: file2[key] }];
      }
      const newValue = deconstructObject(file1[key], file2[key]);
      return { name: key, status: 'unmodified', children: newValue };
    }
    return undefined;
  });
  return list;
};


const constructDiff = (diff) => {
  const result = diff.reduce((acc, item) => {
    const { name, status, children } = item;
    if (status === 'unmodified') {
      if (isObject(children)) {
        return { ...acc, [`  ${name}`]: constructDiff([children]) };
      }
      if (Array.isArray(children)) {
        return { ...acc, [`  ${name}`]: constructDiff(children) };
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

export default (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  if (path1.length <= 0 || path2.length <= 0) {
    return undefined;
  }
  const file1 = parseFile(path1);
  const file2 = parseFile(path2);
  const deconstructed = deconstructObject(file1, file2);
  const diff = constructDiff(deconstructed);
  console.log(diff);
  return diff;
};
