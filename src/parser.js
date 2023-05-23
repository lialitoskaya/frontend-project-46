import yaml from 'js-yaml';
import path from 'path';
import { readFile } from '../buildDiff.js';

const extension = (filepath) => path.extname(filepath);

const parser = (file) => {
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

export default parser;
