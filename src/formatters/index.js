import path from 'path';
import { cwd } from 'process';
import stylishDiff from './stylish.js';
import plainDiff from './plain.js';
import parser from '../parser.js';
import jsonDiff from './json.js';

const makeAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const gendiff = (filepath1, filepath2, formatter) => {
  const obj1 = parser(makeAbsolutePath(filepath1));
  const obj2 = parser(makeAbsolutePath(filepath2));
  if (formatter === 'plain') {
    return plainDiff(obj1, obj2);
  }
  if (formatter === 'json') {
    return jsonDiff(obj1, obj2);
  }
  return stylishDiff(obj1, obj2);
};
export default gendiff;
