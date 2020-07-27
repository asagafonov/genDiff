import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __dirname = path.resolve();
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let json1;
let json2;
let ini1;
let ini2;
let yml1;
let yml2;
let resultStylish;
let resultPlain;
let resultJSON;

beforeEach(() => {
  json1 = getFixturePath('oldJSON.json');
  json2 = getFixturePath('newJSON.json');
  ini1 = getFixturePath('oldINI.ini');
  ini2 = getFixturePath('newINI.ini');
  yml1 = getFixturePath('oldYAML.yml');
  yml2 = getFixturePath('newYAML.yml');
  resultStylish = readFile('expectedStylish.txt');
  resultPlain = readFile('expectedPlain.txt');
  resultJSON = readFile('expectedJSON.txt');
});


test('genDiff', () => {
  expect(console.log(genDiff(json1, json2))).toEqual(console.log(resultStylish));
  expect(console.log(genDiff(json1, json2, 'plain'))).toEqual(console.log(resultPlain));
  expect(console.log(genDiff(json1, json2, 'json'))).toEqual(console.log(resultJSON));

  expect(console.log(genDiff(ini1, ini2))).toEqual(console.log(resultStylish));
  expect(console.log(genDiff(ini1, ini2, 'plain'))).toEqual(console.log(resultPlain));
  expect(console.log(genDiff(ini1, ini2, 'json'))).toEqual(console.log(resultJSON));

  expect(console.log(genDiff(yml1, yml2))).toEqual(console.log(resultStylish));
  expect(console.log(genDiff(yml1, yml2, 'plain'))).toEqual(console.log(resultPlain));
  expect(console.log(genDiff(yml1, yml2, 'json'))).toEqual(console.log(resultJSON));
});
