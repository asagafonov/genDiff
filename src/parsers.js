import _ from 'lodash';
import YAML from 'js-yaml';
import INI from 'ini';

const fixIniParser = (obj) => {
  const digitsOnly = (string) => [...string].every((letter) => '0123456789'.includes(letter));
  const entries = Object.entries(obj);
  return entries.reduce((acc, element) => {
    const [key, value] = element;
    if (_.isObject(value)) {
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

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return YAML.safeLoad(data);
    case 'ini':
      return fixIniParser(INI.parse(data));
    default:
      throw new Error(`Unknown data format: ${format}`);
  }
};

export default parse;
