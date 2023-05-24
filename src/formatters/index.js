import { makeAbsolutePath } from '../../readFile.js';
import stylishDiff from './stylish.js';
import plainDiff from './plain.js';
import parse from '../parser.js';
import jsonDiff from './json.js';

const gendiff = (filepath1, filepath2, formatter) => {
  const obj1 = parse(makeAbsolutePath(filepath1));
  const obj2 = parse(makeAbsolutePath(filepath2));
  if (formatter === 'plain') {
    return plainDiff(obj1, obj2);
  }
  if (formatter === 'json') {
    return jsonDiff(obj1, obj2);
  }
  return stylishDiff(obj1, obj2);
};
export default gendiff;
