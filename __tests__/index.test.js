import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __dirname = path.resolve();
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['json', 'stylish', 'expectedStylish.txt'],
  ['json', 'plain', 'expectedPlain.txt'],
  ['json', 'json', 'expectedJSON.txt'],
  ['ini', 'stylish', 'expectedStylish.txt'],
  ['ini', 'plain', 'expectedPlain.txt'],
  ['ini', 'json', 'expectedJSON.txt'],
  ['yml', 'stylish', 'expectedStylish.txt'],
  ['yml', 'plain', 'expectedPlain.txt'],
  ['yml', 'json', 'expectedJSON.txt'],
];

describe('test genDiff, each case', () => {
  test.each(cases)(
    'files of type %p formatted as %p are expected to match %p',
    (type, format, expectedResult) => {
      const before = getFixturePath(`before.${type}`);
      const after = getFixturePath(`after.${type}`);
      const generateDiff = genDiff(before, after, format).trim();
      const result = readFile(expectedResult).trim();
      expect(generateDiff).toEqual(result);
    },
  );
});
