import yaml from 'js-yaml';

const parse = (data, extname) => {
  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Extensions ${extname} - is incorrect!`);
  }
};

export default parse;
