import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = (filename) => join(__dirname, '..', filename);

test('проверка на нахождение изменений в файлах со вложенной структурой', () => {
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(
    gendiff(
      absolutePath('__fixtures__/newfile3.yaml'),
      absolutePath('__fixtures__/newfile1.json'),
    ),
  ).toEqual(expect.stringContaining(expected));
});

const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
test('проверка plain форматтера', () => {
  expect(
    gendiff(
      absolutePath('__fixtures__/newfile3.yaml'),
      absolutePath('__fixtures__/newfile1.json'),
      'plain',
    ),
  ).toEqual(expected);
});
