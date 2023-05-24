import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const makeAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const readFile = (file) => {
  const fullPath = makeAbsolutePath(file);
  const data = fs.readFileSync(fullPath, 'utf8');
  return data;
};

export { makeAbsolutePath, readFile };
