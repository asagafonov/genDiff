import { test, expect } from '@jest/globals';
import compareObjects from '../src/index.js';

test('compare objects', () => {
  expect(compareObjects()).toBeUndefined();
  expect(compareObjects('', '')).toBeUndefined();
});
