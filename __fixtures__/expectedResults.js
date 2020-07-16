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

const expectedJSON = '[{"name":"common","status":"unmodified","children":[{"name":"follow","status":"added","children":false},{"name":"setting1","status":"unmodified","children":"Value 1"},{"name":"setting2","status":"deleted","children":200},{"name":"setting3","status":"deleted","children":true},{"name":"setting3","status":"added","children":{"key":"value"}},{"name":"setting4","status":"added","children":"blah blah"},{"name":"setting5","status":"added","children":{"key5":"value5"}},{"name":"setting6","status":"unmodified","children":[{"name":"key","status":"unmodified","children":"value"},{"name":"ops","status":"added","children":"vops"}]}]},{"name":"group1","status":"unmodified","children":[{"name":"baz","status":"deleted","children":"bas"},{"name":"baz","status":"added","children":"bars"},{"name":"foo","status":"unmodified","children":"bar"},{"name":"nest","status":"deleted","children":{"key":"value"}},{"name":"nest","status":"added","children":"str"}]},{"name":"group2","status":"deleted","children":{"abc":12345}},{"name":"group3","status":"added","children":{"fee":100500}}]';

export { expectedStylish, expectedPlain, expectedJSON };
