import fs from 'fs';
import YAML from 'js-yaml';
import path from 'path';
import process from 'process';
import INI = 'ini';

const parseFile = (filename) => {
  const currentDirectory = process.cwd();
  const pathToFile = path.resolve(currentDirectory, filename);
  const readFile = fs.readFileSync(pathToFile);
  const extension = path.extname(filename);
  let result;
  if (extension === '.json') {
    result = JSON.parse(readFile);
  }
  if (extension === '.yml') {
    const ymlFile = YAML.safeLoad(readFile);
    const entries = Object.entries(ymlFile);
    result = entries.reduce((acc, currentValue) => {
      const [key, [value]] = currentValue;
      acc[key] = value;
      return acc;
    }, {});
  }
  if (extension === '.ini') {
    result = INI.parse(readFile);
  }
  return result;
};

export default parseFile;
