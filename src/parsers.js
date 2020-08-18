import _ from 'lodash';
import YAML from 'js-yaml';
import INI from 'ini';

const digitsOnly = (string) => [...string].every((letter) => '0123456789'.includes(letter));

const fixIniParser = (obj) => {
  const entries = Object.entries(obj);
  return entries.reduce((acc, element) => {
    const [key, value] = element;
    if (_.isPlainObject(value)) {
      return { ...acc, [key]: fixIniParser(value) };
    }
    if (typeof value === 'string') {
      if (digitsOnly(value)) {
        return { ...acc, [key]: Number(value) };
      }
    }
    return { ...acc, [key]: value };
  }, {});
};

const parseFile = (fileContent, extension) => {
  switch (extension) {
    case '.yml':
      return YAML.safeLoad(fileContent);
    case '.ini':
      return fixIniParser(INI.parse(fileContent));
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};

export default parseFile;
