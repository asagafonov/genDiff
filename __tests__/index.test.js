import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import process from 'process';
import genDiff from '../src/index.js';
import { expectedPlain, expectedStylish, expectedJSON } from '../__fixtures__/expectedResults.js';

const __dirname = path.resolve();
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', `/${filename}`);

const path1 = getFixturePath('before.json');
const path2 = getFixturePath('after.json');

test('genDiff', () => {
  expect(genDiff(path1, path2)).toEqual(expectedStylish);
  expect(genDiff(path1, path2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(path1, path2, 'json')).toEqual(expectedJSON);
});
