import { test, expect } from '@jest/globals';
import compareObjects from '../src/index.js';

/*
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
*/

test('compare objects', () => {
  expect(compareObjects('before.json', 'after.json')).toEqual(
    '{\n   - follow: false\n   host: hexlet.io\n   - proxy: 123.234.53.22\n   + timeout: 20\n   - timeout: 50\n   + verbose: true\n}',
  );
  expect(compareObjects()).toBeUndefined();
  expect(compareObjects('', '')).toBeUndefined();
});
