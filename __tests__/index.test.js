import { test, expect } from '@jest/globals';
import compareObjects from '../src/index.js';

test('compare objects', () => {
  expect(compareObjects('before.json', 'after.json')).toEqual(
    `{
     - follow: false
     host: hexlet.io
     - proxy: 123.234.53.22
     + timeout: 20
     - timeout: 50
     + verbose: true
  }`,
  );
  expect(compareObjects()).toBeUndefined();
  expect(compareObjects('', '')).toBeUndefined();
});
