import path from 'path';
import { cwd } from 'process';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import parser from './src/parser.js';

const makeAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const gendiff = (filepath1, filepath2, formatter) => {
  const obj1 = parser(makeAbsolutePath(filepath1));
  const obj2 = parser(makeAbsolutePath(filepath2));
  if (formatter === 'plain') {
    return plain(obj1, obj2);
  }
  return stylish(obj1, obj2);
};
export default gendiff;
