import { test, expect } from '@jest/globals';
import parseFile from '../src/parsers/parsers.js';

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parse file', () => {
  expect(parseFile('./__fixtures__/before.json')).toEqual(expected);
  expect(parseFile('./__fixtures__/before.yml')).toEqual(expected);
});
