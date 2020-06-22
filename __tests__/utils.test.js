import { test, expect } from '@jest/globals';
import { isObject, isUnique } from '../src/utils/utils.js';

const item1 = { name: 'Bob' };
const item2 = ['name', 'Bob'];
const item3 = 'the name is Bob';
const item4 = undefined;
const item5 = null;
const item6 = false;

test('is object', () => {
  expect(isObject(item1)).toBeTruthy();
  expect(isObject(item2)).toBeFalsy();
  expect(isObject(item3)).toBeFalsy();
  expect(isObject(item4)).toBeFalsy();
  expect(isObject(item5)).toBeFalsy();
  expect(isObject(item6)).toBeFalsy();
});

const objects = [
  { name: 'Bob', status: true, value: 'x' },
  { name: 'Chuck', status: false, value: 'y' },
  { name: 'Bob', status: true, value: 'x' },
  { name: 'Sarah', status: true, value: 'y' },
  { name: 'Sarah', status: true, value: 'z' },
];

const object1 = { name: 'Bob', status: true, value: 'x' };
const object2 = { name: 'Chuck', status: false, value: 'y' };
const object3 = { name: 'Sarah', status: true, value: 'y' };

test('is unique object', () => {
  expect(isUnique(objects, object1)).toBeFalsy();
  expect(isUnique(objects, object2)).toBeTruthy();
  expect(isUnique(objects, object3)).toBeFalsy();
});
