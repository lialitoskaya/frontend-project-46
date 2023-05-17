import path from 'path';
import { cwd } from 'process';
import { keyDiffData } from './index.js';
import parser from './parser.js';

const makeAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const makeIndent = (node) => {
  const newNode = node.split('\n');
  return newNode
    .map((str) => {
      if (str !== newNode[0]) {
        return `    ${str}`;
      }
      return str;
    })
    .join('\n');
};
const convert = (tree) => {
  const newString = JSON.stringify(tree, null, 4).replaceAll('"', '');
  return makeIndent(newString).replaceAll(',', '').trim();
};

const diffData = (obj1, obj2) => {
  const newData = keyDiffData(obj1, obj2);
  // console.log(newData);
  const resultdiff = (data) => data
    .map((child) => {
      switch (child.status) {
        case 'unchanged':
          return `    ${child.key}: ${convert(child.value)}`;
        case 'changed':
          return `  - ${child.key}: ${convert(child.oldValue)}\n  + ${
            child.key
          }: ${convert(child.newValue)}`;
        case 'deleted':
          return `  - ${child.key}: ${convert(child.value)}`;
        case 'added':
          return `  + ${child.key}: ${convert(child.value)}`;
        case 'nested':
          return `    ${child.key}: {\n    ${makeIndent(
            resultdiff(child.children),
          )}\n    }`;
        default:
          throw new Error();
      }
    })
    .join('\n');

  return `{\n${resultdiff(newData)}\n}`;
};

const gendiff = (filepath1, filepath2) => {
  const obj1 = parser(makeAbsolutePath(filepath1));
  const obj2 = parser(makeAbsolutePath(filepath2));
  const resultKeyDiff = diffData(obj1, obj2);
  return resultKeyDiff;
};

export default gendiff;
