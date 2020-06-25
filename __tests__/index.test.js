import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import path from 'path';
import process from 'process';

const __dirname = process.cwd();
const getFixturePath = (filename) => path.join(__dirname, 'frontend-project-lvl2', '..', '__fixtures__', filename);

const path1 = getFixturePath('before.json');
const path2 = getFixturePath('after.json');


const expectedStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: { key: value }
      + setting4: blah blah
      + setting5: { key5: value5 }
        setting6: {
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: { key: value }
      + nest: str
    }
  - group2: { abc: 12345 }
  + group3: { fee: 100500 }
}`;

const expectedPlain = `Property 'common.follow' was added with value 'false'
Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to '[complex value]'
Property 'common.setting4' was added with value 'blah blah'
Property 'common.setting5' was added with value '[complex value]'
Property 'common.setting6.ops' was added with value 'vops'
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from '[complex value]' to 'str'
Property 'group2' was deleted
Property 'group3' was added with value '[complex value]'`;


test('genDiff', () => {
  expect(genDiff(path1, path2)).toEqual(expectedStylish);
  expect(genDiff(path1, path2, 'plain')).toEqual(expectedPlain);
});
