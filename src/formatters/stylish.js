import _ from 'lodash';
import { keyDiffData } from '../../buildDiff.js';

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
  if (_.isObject(tree)) {
    const newString1 = JSON.stringify(tree, null, 4);
    const resultString = makeIndent(newString1)
      .replaceAll(',', '')
      .replaceAll('"', '')
      .trim();
    return resultString;
  }
  return `${tree}`;
};

const stylish = (obj1, obj2) => {
  const newData = keyDiffData(obj1, obj2);
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

export default stylish;
