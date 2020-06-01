import compareObjects from '../src/index.js';

const json1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

const json2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};


test('compare objects', () => {
  expect(compareObjects(json1, json2)).toEqual(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`);
});
