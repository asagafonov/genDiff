import _ from 'lodash';
import parseFile from './parsers/parsers.js';
import { isObject } from './utils/utils.js';
import chooseFormat from './formatters/index.js';

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


export default (path1, path2, format) => {
  const file1 = parseFile(path1);
  const file2 = parseFile(path2);
  const deconstructed = deconstructObject(file1, file2);
  console.log();
  const diff = chooseFormat(format, deconstructed);
  console.log();
  return diff;
};
