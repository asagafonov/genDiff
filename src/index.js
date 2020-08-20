import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import chooseOutput from './formatters/index.js';

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

  const chooseValType = (v) => (_.isPlainObject(v) ? expand(v) : v);

  return keys.map((key) => {
    if (!_.has(filename1, key)) {
      return { name: key, status: 'added', value: chooseValType(filename2[key]) };
    }
    if (!_.has(filename2, key)) {
      return { name: key, status: 'deleted', value: chooseValType(filename1[key]) };
    }
    if (_.isPlainObject(filename1[key]) && _.isPlainObject(filename2[key])) {
      return { name: key, status: 'unmodified', value: makeDiff(filename1[key], filename2[key]) };
    }
    if (filename1[key] === filename2[key]) {
      return { name: key, status: 'unmodified', value: chooseValType(filename1[key]) };
    }
    return {
      name: key, status: 'modified', oldValue: chooseValType(filename1[key]), newValue: chooseValType(filename2[key]),
    };
  });
};

export default (filepath1, filepath2, outputFormat) => {
  const currentDirectory = process.cwd();
  const fullPath1 = path.resolve(currentDirectory, filepath1);
  const fullPath2 = path.resolve(currentDirectory, filepath2);

  const getFileFormat = (filepath) => path.extname(filepath);
  const fileFormat1 = getFileFormat(fullPath1);
  const fileFormat2 = getFileFormat(fullPath2);

  const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
  const data1 = readFile(fullPath1);
  const data2 = readFile(fullPath2);

  const parsedFile1 = parse(data1, fileFormat1);
  const parsedFile2 = parse(data2, fileFormat2);
  const diff = makeDiff(parsedFile1, parsedFile2);
  const showDifference = chooseOutput(outputFormat, diff);
  return showDifference;
};
