import _ from 'lodash';
import parseFile from './parsers/parsers.js';

const compareFiles = (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  if (path1.length <= 0 || path2.length <= 0) {
    return undefined;
  }
  const file1 = parseFile(path1);
  const file2 = parseFile(path2);
  const entries1 = Object.entries(file1);
  const entries2 = Object.entries(file2);
  const list = _.uniqWith(_.concat(entries1, entries2).sort(), _.isEqual);
  const result = [];
  list.forEach((element) => {
    const [key, value] = element;
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        result.push(`   ${key}: ${file1[key]}`);
      } else {
        result.push(`   + ${key}: ${file2[key]}`);
        result.push(`   - ${key}: ${file1[key]}`);
      }
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      result.push(`   - ${key}: ${file1[key]}`);
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      result.push(`   + ${key}: ${file2[key]}`);
    }
  });
  let resultAsString = '{\n';
  resultAsString += _.uniq(result).join('\n');
  resultAsString += '\n}';
  console.log(resultAsString);
  return resultAsString;
};

export default compareFiles;

/*
const isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
};

const deconstructObject = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.uniq(_.concat(keys1, keys2));

  const list = keys.flatMap((key) => {
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { name: key, value: file1[key], status: 'deleted' };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { name: key, value: file2[key], status: 'added' };
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      if (!isObject(file1[key]) || !isObject(file2[key])) {
        if (file1[key] === file2[key]) {
          return { name: key, value: file1[key], status: 'unmodified'};
        } else {
        return [{ name: key, value: file1[key], status: 'deleted' }, { name: key, value: file2[key], status: 'added' }];
        }
      }
      const newValue = genDiff(file1[key], file2[key]);
      return { name: key, value: newValue };
    }
  });
  return list;
};
*/
