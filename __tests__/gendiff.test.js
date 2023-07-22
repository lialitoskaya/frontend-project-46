import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = (filename) => path.join(__dirname, '..', filename);

const resultWithTrim = (resultpath) => fs.readFileSync(absolutePath(resultpath), 'utf-8').split('\r').join('');
const stylishResult = resultWithTrim('__fixtures__/stylishFixture.txt');
const plainResult = resultWithTrim('__fixtures__/plainFixture.txt');
const jsonResult = fs.readFileSync(
  absolutePath('__fixtures__/jsonFixture.txt'),
  'utf-8',
);

const extensions = [
  ['yaml', 'json', 'with different extension'],
  ['json', 'json', "with '.json' extensions"],
  ['yaml', 'yml', "with '.yaml' extensions"],
];

describe.each(extensions)(
  'checking stylish formatter',
  (ext1, ext2, describe) => {
    test(`${describe}`, () => {
      const file1 = absolutePath(`__fixtures__/file2.${ext1}`);
      const file2 = absolutePath(`__fixtures__/file1.${ext2}`);
      expect(gendiff(file1, file2, 'stylish')).toEqual(stylishResult);
    });
  },
);

describe.each(extensions)(
  'checking plain formatter',
  (ext1, ext2, describe) => {
    test(`${describe}`, () => {
      const filepath1 = absolutePath(`__fixtures__/file2.${ext1}`);
      const filepath2 = absolutePath(`__fixtures__/file1.${ext2}`);
      expect(gendiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
    });
  },
);

describe.each(extensions)('checking json formatter', (ext1, ext2, describe) => {
  test(`${describe}`, () => {
    const filepath1 = absolutePath(`__fixtures__/file2.${ext1}`);
    const filepath2 = absolutePath(`__fixtures__/file1.${ext2}`);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});

describe.each(extensions)(
  'checking default formatter',
  (ext1, ext2, describe) => {
    test(`${describe}`, () => {
      const filepath1 = absolutePath(`__fixtures__/file2.${ext1}`);
      const filepath2 = absolutePath(`__fixtures__/file1.${ext2}`);
      expect(gendiff(filepath1, filepath2)).toEqual(stylishResult);
    });
  },
);
