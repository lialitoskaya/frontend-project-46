import jsonDiff from './json.js';
import stylishDiff from './stylish.js';
import plainDiff from './plain.js';

const getFormatted = (data, formatter) => {
  switch (formatter) {
    case 'plain':
      return plainDiff(data);
    case 'json':
      return jsonDiff(data);
    default:
      return stylishDiff(data);
  }
};
export default getFormatted;
