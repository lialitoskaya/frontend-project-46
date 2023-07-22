import _ from 'lodash';

const getKeys = (obj1, obj2) => {
  const entries1 = Object.keys(obj1);
  const entries = Object.keys(obj2);
  const unionKeys = _.union(entries1, entries);
  return unionKeys;
};

const makeAstTree = (obj1, obj2) => {
  const keys = getKeys(obj1, obj2);
  const sortedKeys = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'deleted' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        children: makeAstTree(obj1[key], obj2[key]),
        status: 'nested',
      };
    }
    return obj1[key] === obj2[key]
      ? { key, value: obj1[key], status: 'unchanged' }
      : {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'changed',
      };
  });
  /* eslint-disable */
  return sortedKeys.sort((a, b) => (a.key > b.key ? 1 : -1));
  /* eslint-enable */
};

export default makeAstTree;
