import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __dirname = path.resolve();
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['oldJSON.json', 'newJSON.json', 'stylish', 'expectedStylish.txt'],
  ['oldJSON.json', 'newJSON.json', 'plain', 'expectedPlain.txt'],
  ['oldJSON.json', 'newJSON.json', 'json', 'expectedJSON.txt'],
  ['oldINI.ini', 'newINI.ini', 'stylish', 'expectedStylish.txt'],
  ['oldINI.ini', 'newINI.ini', 'plain', 'expectedPlain.txt'],
  ['oldINI.ini', 'newINI.ini', 'json', 'expectedJSON.txt'],
  ['oldYAML.yml', 'newYAML.yml', 'stylish', 'expectedStylish.txt'],
  ['oldYAML.yml', 'newYAML.yml', 'plain', 'expectedPlain.txt'],
  ['oldYAML.yml', 'newYAML.yml', 'json', 'expectedJSON.txt'],
];

describe('test genDiff, each case', () => {
  test.each(cases)(
    'file %p and file %p formatted as %p result as %p',
    (filepath1, filepath2, format, expectedResult) => {
      const first = getFixturePath(filepath1);
      const second = getFixturePath(filepath2);
      const generateDiff = genDiff(first, second, format).replace(/\s/g, '');
      const result = readFile(expectedResult).replace(/\s/g, '');
      expect(generateDiff).toEqual(result);
    }
  )
});
