import _ from 'lodash';

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
    return makeIndent(newString1)
      .replaceAll(',', '')
      .replaceAll('"', '')
      .trim();
  }
  return `${node}`;
};

const stylishDiff = (obj) => {
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

  return `{\n${resultdiff(obj)}\n}`;
};

export default stylishDiff;
