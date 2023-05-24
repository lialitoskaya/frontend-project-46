import yaml from 'js-yaml';
import path from 'path';
import { readFile } from '../readFile.js';

const extension = (filepath) => path.extname(filepath);

const parse = (file) => {
  switch (extension(file)) {
    case '.json':
      return JSON.parse(readFile(file));
    case '.yml':
      return yaml.load(readFile(file));
    case '.yaml':
      return yaml.load(readFile(file));
    default:
      throw new Error();
  }
};

export default parse;
