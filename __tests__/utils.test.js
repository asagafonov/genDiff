import { test, expect } from '@jest/globals';
import { isObject, isUnique, stringify, fixIniParser } from '../src/utils/utils.js';

//isObject

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

//isUniqueObject

const objects = [
  { name: 'Bob', status: true, value: 'x' },
  { name: 'Chuck', status: false, value: 'y' },
  { name: 'Bob', status: true, value: 'x' },
  { name: 'Sarah', status: true, value: 'y' },
  { name: 'Sarah', status: true, value: 'z' },
];

const [object1, object2, , object3, ] = objects;

test('is unique object', () => {
  expect(isUnique(objects, object1)).toBeFalsy();
  expect(isUnique(objects, object2)).toBeTruthy();
  expect(isUnique(objects, object3)).toBeFalsy();
});

//stringify

test('stringify', () => {
  expect(stringify({ a: 'b' })).toEqual(' a: b ');
  expect(stringify({ a: 'b', c: 'd'})).toEqual(' a: b \n c: d ');
})

//fixIniParser

test('fix ini', () => {
  expect(fixIniParser({ a: 'yes', b: '1', c: '2'})).toEqual({ a: 'yes', b: 1, c: 2 });
  expect(fixIniParser({ a: 'yes', b: 'no'})).toEqual({ a: 'yes', b: 'no'});
});
