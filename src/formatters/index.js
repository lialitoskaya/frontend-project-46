import jsonDiff from './json.js';
import stylishDiff from './stylish.js';
import plainDiff from './plain.js';

const diff = (data1, data2, formatter) => {
  if (formatter === 'plain') {
    return plainDiff(data1, data2);
  }
  if (formatter === 'json') {
    return jsonDiff(data1, data2);
  }
  return stylishDiff(data1, data2);
};
export default diff;
