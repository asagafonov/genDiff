import fs from 'fs';
import path from 'path';
import process from 'process';
import YAML from 'js-yaml';
import INI from 'ini';
import { fixIniParser } from '../utils/utils.js';

const parseFile = (filename) => {
  const currentDirectory = process.cwd();
  const pathToFile = path.resolve(currentDirectory, filename);
  const readFile = fs.readFileSync(pathToFile, 'utf-8');
  const extension = path.extname(filename);
  const iniFile = INI.parse(readFile);
  const ymlFile = YAML.safeLoad(readFile);
  const ymlEntries = Object.entries(ymlFile);
  switch (extension) {
    case '.yml':
      return ymlEntries.reduce((acc, currentValue) => {
        const [key, [value]] = currentValue;
        acc[key] = value;
        return acc;
      }, {});
    case '.ini':
      return fixIniParser(iniFile);
    case '.json':
      return JSON.parse(readFile);
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};

export default parseFile;
