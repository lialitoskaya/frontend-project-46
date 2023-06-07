import _ from 'lodash';
import diffData from '../../buildDiff.js';

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
const convert = (node) => {
  if (_.isObject(node)) {
    const newString1 = JSON.stringify(node, null, 4);
    console.log(makeIndent(newString1));
    return makeIndent(newString1)
      .replaceAll(',', '')
      .replaceAll('"', '')
      .trim();
  }
  return `${node}`;
};

const stylishDiff = (obj1, obj2) => {
  const newData = diffData(obj1, obj2);
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

export default stylishDiff;
