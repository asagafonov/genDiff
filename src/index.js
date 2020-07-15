import _ from 'lodash';
import path from 'path';
import parseFile from './parsers.js';
import { isObject } from './utils.js';
import chooseFormat from './formatters/index.js';

const listDiffProperties = (file1, file2) => {
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
    if (!isObject(file1[key]) || !isObject(file2[key])) {
      if (file1[key] === file2[key]) {
        return { name: key, status: 'unmodified', children: file1[key] };
      }
      return [{ name: key, status: 'deleted', children: file1[key] }, { name: key, status: 'added', children: file2[key] }];
    }
    const newValue = listDiffProperties(file1[key], file2[key]);
    return { name: key, status: 'unmodified', children: newValue };
  });
  return list;
};


export default (filename1, filename2, format) => {
  const currentDirectory = process.cwd();
  const pathToFile1 = path.resolve(currentDirectory, filename1);
  const pathToFile2 = path.resolve(currentDirectory, filename2);
  const file1 = parseFile(pathToFile1);
  const file2 = parseFile(pathToFile2);
  const properties = listDiffProperties(file1, file2);
  const diff = chooseFormat(format, properties);
  return diff;
};
