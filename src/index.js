import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import chooseDisplayMode from './formatters/index.js';

const expand = (object) => {
  const keys = Object.keys(object);
  return keys.map((key) => {
    if (!_.isPlainObject(object[key])) {
      return { name: key, status: 'unmodified', value: object[key] };
    }
    return { name: key, status: 'unmodified', value: expand(object[key]) };
  });
};

const makeDiff = (filename1, filename2) => {
  const keys1 = Object.keys(filename1);
  const keys2 = Object.keys(filename2);
  const keys = _.uniq(_.concat(keys1, keys2).sort());

  const valueType = (value) => (_.isPlainObject(value) ? expand(value) : value);

  return keys.map((key) => {
    if (!_.has(filename1, key)) {
      return { name: key, status: 'added', value: valueType(filename2[key]) };
    }
    if (!_.has(filename2, key)) {
      return { name: key, status: 'deleted', value: valueType(filename1[key]) };
    }
    if (_.isPlainObject(filename1[key]) && _.isPlainObject(filename2[key])) {
      return { name: key, status: 'unmodified', value: makeDiff(filename1[key], filename2[key]) };
    }
    if (filename1[key] === filename2[key]) {
      return { name: key, status: 'unmodified', value: valueType(filename1[key]) };
    }
    return {
      name: key, status: 'modified', oldValue: valueType(filename1[key]), newValue: valueType(filename2[key]),
    };
  });
};

export default (filename1, filename2, format) => {
  const currentDirectory = process.cwd();
  const filepath1 = path.resolve(currentDirectory, filename1);
  const filepath2 = path.resolve(currentDirectory, filename2);
  const identifyExtension = (filepath) => path.extname(filepath);
  const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
  const parsedFile1 = parseFile(readFile(filepath1), identifyExtension(filepath2));
  const parsedFile2 = parseFile(readFile(filepath2), identifyExtension(filepath2));
  const diff = makeDiff(parsedFile1, parsedFile2);
  const diffDisplay = chooseDisplayMode(format, diff);
  return diffDisplay;
};
