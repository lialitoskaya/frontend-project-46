import { diffData } from '../../buildDiff.js';

const jsonDiff = (file1, file2) => {
  const data = diffData(file1, file2);
  return JSON.stringify(data);
};

export default jsonDiff;
