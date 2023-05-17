import fs from 'fs';

import _ from 'lodash';

const readFile = (file) => fs.readFileSync(file, 'utf8');
const getKeys = (file1, file2) => {
  const entries1 = Object.keys(file1);
  const entries = Object.keys(file2);
  const unionKeys = _.union(entries1, entries);
  return unionKeys;
};

const keyDiffData = (f1, f2) => {
  const keys = getKeys(f1, f2);
  return keys
    .map((key) => {
      if (_.has(f1, key) && !_.has(f2, key)) {
        return { key, value: f1[key], status: 'deleted' };
      }
      if (_.has(f2, key) && !_.has(f1, key)) {
        return { key, value: f2[key], status: 'added' };
      }
      if (_.isObject(f1[key]) && _.isObject(f2[key])) {
        return {
          key,
          children: keyDiffData(f1[key], f2[key]),
          status: 'nested',
        };
      }
      return f1[key] === f2[key]
        ? { key, value: f1[key], status: 'unchanged' }
        : {
          key,
          oldValue: f1[key],
          newValue: f2[key],
          status: 'changed',
        };
    })
    .sort((a, b) => (a.key > b.key ? 1 : -1));
};

export { readFile, keyDiffData };
