import { test, expect } from '@jest/globals';
import compareObjects from '../src/index.js';

test('compare objects', () => {
  expect(compareObjects('./__fixtures__/before.json', './__fixtures__/after.json')).toEqual(
    '{\n   - follow: false\n   host: hexlet.io\n   - proxy: 123.234.53.22\n   + timeout: 20\n   - timeout: 50\n   + verbose: true\n}',
  );
  expect(compareObjects()).toBeUndefined();
  expect(compareObjects('', '')).toBeUndefined();
});
