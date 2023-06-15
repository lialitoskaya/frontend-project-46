import jsonDiff from './json.js';
import stylishDiff from './stylish.js';
import plainDiff from './plain.js';

const getFormatted = (data, formatter) => {
  if (formatter === 'plain') {
    return plainDiff(data);
  }
  if (formatter === 'json') {
    return jsonDiff(data);
  }
  return stylishDiff(data);
};
export default getFormatted;
