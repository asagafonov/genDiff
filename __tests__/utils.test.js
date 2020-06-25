import { test, expect } from '@jest/globals';
import {
  isObject,
  isUnique,
  stringify,
  fixIniParser,
  combineObjects,
} from '../src/utils/utils.js';

// isObject

const items = [{ name: 'Bob' }, ['name', 'Bob'], 'the name is Bob', undefined, null, false];
const [item1, item2, item3, item4, item5, item6] = items;

test('is object', () => {
  expect(isObject(item1)).toBeTruthy();
  expect(isObject(item2)).toBeFalsy();
  expect(isObject(item3)).toBeFalsy();
  expect(isObject(item4)).toBeFalsy();
  expect(isObject(item5)).toBeFalsy();
  expect(isObject(item6)).toBeFalsy();
});

// isUniqueObject

const objects = [
  { name: 'Bob', status: true, value: 'x' },
  { name: 'Chuck', status: false, value: 'y' },
  { name: 'Bob', status: true, value: 'x' },
  { name: 'Sarah', status: true, value: 'y' },
  { name: 'Sarah', status: true, value: 'z' },
];

const [object1, object2, , object3] = objects;

test('is unique object', () => {
  expect(isUnique(objects, object1)).toBeFalsy();
  expect(isUnique(objects, object2)).toBeTruthy();
  expect(isUnique(objects, object3)).toBeFalsy();
});

// stringify

test('stringify', () => {
  expect(stringify({ a: 'b' })).toEqual(' a: b ');
  expect(stringify({ a: 'b', c: 'd' })).toEqual(' a: b \n c: d ');
});

// fixIniParser

test('fix ini', () => {
  expect(fixIniParser({ a: 'yes', b: '1', c: '2' })).toEqual({ a: 'yes', b: 1, c: 2 });
  expect(fixIniParser({ a: 'yes', b: 'no' })).toEqual({ a: 'yes', b: 'no' });
});

// combineObjects

const elements1 = [
  { name: '.group1.baz', status: 'deleted', children: 'bas' },
  { name: '.group1.baz', status: 'added', children: 'bars' },
];

const elements2 = [
  { name: 'jane', status: 'deleted', children: 'loca' },
  { name: 'jane', status: 'added', children: 'toca' },
  { name: 'dendy', status: 'deleted', children: true },
  { name: 'dendy', status: 'added', children: false },
];

test('combine objects', () => {
  expect(combineObjects([])).toEqual([]);
  expect(combineObjects(elements1)).toEqual([{
    name: '.group1.baz',
    status: 'changed',
    value1: 'bas',
    value2: 'bars',
  }]);
  expect(combineObjects(elements2)).toEqual([{
    name: 'jane',
    status: 'changed',
    value1: 'loca',
    value2: 'toca',
  },
  {
    name: 'dendy',
    status: 'changed',
    value1: true,
    value2: false,
  },
  ]);
});
