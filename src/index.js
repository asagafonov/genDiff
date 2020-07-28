import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import { isObject } from './utils.js';
import chooseDisplayMode from './formatters/index.js';

const makeDiff = (filename1, filename2) => {
  const keys1 = Object.keys(filename1);
  const keys2 = Object.keys(filename2);
  const keys = _.uniq(_.concat(keys1, keys2).sort());

  const list = keys.flatMap((key) => {
    if (!_.has(filename1, key) && _.has(filename2, key)) {
      return { name: key, status: 'added', children: filename2[key] };
    }
    if (_.has(filename1, key) && !_.has(filename2, key)) {
      return { name: key, status: 'deleted', children: filename1[key] };
    }
    if (isObject(filename1[key]) && isObject(filename2[key])) {
      return { name: key, status: 'unmodified', children: makeDiff(filename1[key], filename2[key]) };
    }
    if (filename1[key] === filename2[key]) {
      return { name: key, status: 'unmodified', children: filename1[key] };
    }
    return {
      name: key, status: 'modified', oldChildren: filename1[key], newChildren: filename2[key],
    };
  });
  return list;
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
