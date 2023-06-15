import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import parse from './parser.js';
import getFormatted from './formatters/index.js';
import makeAstTree from './makeAstTree.js';

const makeAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const extension = (filepath) => path.extname(filepath);

const gendiff = (filepath1, filepath2, formatter = 'stylish') => {
  const absolutePath1 = makeAbsolutePath(filepath1);
  const absolutePath2 = makeAbsolutePath(filepath2);
  const data1 = fs.readFileSync(absolutePath1, 'utf8');
  const data2 = fs.readFileSync(absolutePath2, 'utf8');
  const extname1 = extension(absolutePath1);
  const extname2 = extension(absolutePath2);
  const parseData1 = parse(data1, extname1);
  const parseData2 = parse(data2, extname2);
  return getFormatted(makeAstTree(parseData1, parseData2), formatter);
};
export default gendiff;
