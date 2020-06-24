import { test, expect } from '@jest/globals';
import parseFile from '../src/parsers/parsers.js';

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parse file', () => {
  expect(parseFile('./__fixtures__/json/jsonUnit.json')).toEqual(expected);
  expect(parseFile('./__fixtures__/yaml/yamlUnit.yml')).toEqual(expected);
  expect(parseFile('./__fixtures__/ini/iniUnit.ini')).toEqual(expected);
});
