import process from 'process';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const compareFiles = (path1, path2) => {
  if (path1 === undefined || path2 === undefined) {
    return undefined;
  }
  if (path1.length <= 0 || path2.length <= 0) {
    return undefined;
  }
  const currentDirectory = process.cwd();
  const pathToObject1 = path.isAbsolute(path1) ? path1 : path.resolve(currentDirectory, path1);
  const pathToObject2 = path.isAbsolute(path2) ? path2 : path.resolve(currentDirectory, path2);
  const file1 = JSON.parse(fs.readFileSync(pathToObject1));
  const file2 = JSON.parse(fs.readFileSync(pathToObject2));

  const entries1 = Object.entries(file1);
  const entries2 = Object.entries(file2);
  const list = _.uniqWith(_.concat(entries1, entries2).sort(), _.isEqual);
  const result = [];
  list.forEach((element) => {
    const [key, value] = element;
    if (_.has(file1, key) && _.has(file2, key)) {
      if (file1[key] === file2[key]) {
        result.push(`   ${key}: ${value}`);
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
