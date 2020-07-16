import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';
import INI from 'ini';
import { fixIniParser } from './utils.js';

const parseFile = (filename) => {
  const readFile = fs.readFileSync(filename, 'utf-8');
  const extension = path.extname(filename);
  switch (extension) {
    case '.yml':
      return YAML.safeLoad(readFile);
    case '.ini':
      return fixIniParser(INI.parse(readFile));
    case '.json':
      return JSON.parse(readFile);
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};

export default parseFile;
