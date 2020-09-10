import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const makeDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, status: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, status: 'deleted', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, status: 'unknown', children: makeDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] === obj2[key]) {
      return { name: key, status: 'unmodified', value: obj1[key] };
    }
    return {
      name: key, status: 'modified', oldValue: obj1[key], newValue: obj2[key],
    };
  });
};

export default (filepath1, filepath2, outputFormat) => {
  const currentDirectory = process.cwd();
  const fullPath1 = path.resolve(currentDirectory, filepath1);
  const fullPath2 = path.resolve(currentDirectory, filepath2);

  const getFileFormat = (filepath) => path.extname(filepath).slice(1);
  const fileFormat1 = getFileFormat(fullPath1);
  const fileFormat2 = getFileFormat(fullPath2);

  const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
  const data1 = readFile(fullPath1);
  const data2 = readFile(fullPath2);

  const parsedFile1 = parse(data1, fileFormat1);
  const parsedFile2 = parse(data2, fileFormat2);
  const diff = makeDiff(parsedFile1, parsedFile2);
  const result = format(outputFormat, diff);
  return result;
};
