import diffData from '../../buildDiff.js';

const typeOfValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};
const plainDiff = (obj1, obj2) => {
  const newData = diffData(obj1, obj2);
  const resultdiff = (data, path) => data
    .filter((child) => child.status !== 'unchanged')
    .map((child) => {
      const fullPath = path === '' ? `${child.key}` : `${path}.${child.key}`;
      switch (child.status) {
        case 'changed':
          return `Property '${fullPath}' was updated. From ${typeOfValue(
            child.oldValue,
          )} to ${typeOfValue(child.newValue)}`;
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${typeOfValue(
            child.value,
          )}`;
        case 'nested':
          return `${resultdiff(child.children, fullPath)}`;
        default:
          throw new Error();
      }
    })
    .join('\n');

  return resultdiff(newData, '');
};
export default plainDiff;
