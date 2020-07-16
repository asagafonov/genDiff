import { test, expect } from '@jest/globals';
import path from 'path';
import genDiff from '../src/index.js';
import { expectedPlain, expectedStylish, expectedJSON } from '../__fixtures__/expectedResults.js';

const __dirname = path.resolve();
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', `/${filename}`);

const json1 = getFixturePath('oldJSON.json');
const json2 = getFixturePath('newJSON.json');
const ini1 = getFixturePath('oldINI.ini');
const ini2 = getFixturePath('newINI.ini');
const yml1 = getFixturePath('oldYAML.yml');
const yml2 = getFixturePath('newYAML.yml');

test('genDiff', () => {
  expect(genDiff(json1, json2)).toEqual(expectedStylish);
  expect(genDiff(json1, json2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(json1, json2, 'json')).toEqual(expectedJSON);

  expect(genDiff(ini1, ini2)).toEqual(expectedStylish);
  expect(genDiff(ini1, ini2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(ini1, ini2, 'json')).toEqual(expectedJSON);

  expect(genDiff(yml1, yml2)).toEqual(expectedStylish);
  expect(genDiff(yml1, yml2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(yml1, yml2, 'json')).toEqual(expectedJSON);
});
