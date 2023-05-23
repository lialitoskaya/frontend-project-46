import { fileURLToPath } from "url";
import { dirname, join } from "path";
import gendiff from "../src/formatters/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = (filename) => join(__dirname, "..", filename);

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

const expected2 = `{
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

const expected3 = `[{"key":"common","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"deleted"},{"key":"setting3","oldValue":true,"newValue":null,"status":"changed"},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","oldValue":"","newValue":"so much","status":"changed"}],"status":"nested"},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}],"status":"nested"}],"status":"nested"},{"key":"group1","children":[{"key":"baz","oldValue":"bas","newValue":"bars","status":"changed"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","oldValue":{"key":"value"},"newValue":"str","status":"changed"}],"status":"nested"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"deleted"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]`;

test("checking stylish formatter with files of different extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile3.yaml"),
      absolutePath("__fixtures__/newfile1.json"),
      "stylish"
    )
  ).toEqual(expected2);
});
test("checking stylish formatter with files with '.json' extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile.json"),
      absolutePath("__fixtures__/newfile1.json"),
      "stylish"
    )
  ).toEqual(expected2);
});
test("checking stylish formatter with files with '.yaml' extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile3.yaml"),
      absolutePath("__fixtures__/newfile4.yml"),
      "stylish"
    )
  ).toEqual(expected2);
});

test("checking plain formatter with files of different extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile3.yaml"),
      absolutePath("__fixtures__/newfile1.json"),
      "plain"
    )
  ).toEqual(expected);
});

test("checking plain formatter with files with '.json' extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile.json"),
      absolutePath("__fixtures__/newfile1.json"),
      "plain"
    )
  ).toEqual(expected);
});

test("checking plain formatter with files with '.yaml' extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile3.yaml"),
      absolutePath("__fixtures__/newfile4.yml"),
      "plain"
    )
  ).toEqual(expected);
});

test("checking json formatter with files of different extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile3.yaml"),
      absolutePath("__fixtures__/newfile1.json"),
      "json"
    )
  ).toEqual(expected3);
});

test("checking json formatter with files with '.json' extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile.json"),
      absolutePath("__fixtures__/newfile1.json"),
      "json"
    )
  ).toEqual(expected3);
});

test("checking json formatter with files with '.yaml' extensions", () => {
  expect(
    gendiff(
      absolutePath("__fixtures__/newfile3.yaml"),
      absolutePath("__fixtures__/newfile4.yml"),
      "json"
    )
  ).toEqual(expected3);
});
