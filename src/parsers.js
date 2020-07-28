import YAML from 'js-yaml';
import INI from 'ini';
import { fixIniParser } from './utils.js';

const parseFile = (fileContents, extension) => {
  switch (extension) {
    case '.yml':
      return YAML.safeLoad(fileContents);
    case '.ini':
      return fixIniParser(INI.parse(fileContents));
    case '.json':
      return JSON.parse(fileContents);
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};

export default parseFile;
