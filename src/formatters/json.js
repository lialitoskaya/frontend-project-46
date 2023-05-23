import { keyDiffData } from "../../buildDiff.js";

const jsonDiff = (file1, file2) => {
  const data = keyDiffData(file1, file2);
  return JSON.stringify(data);
};

export default jsonDiff;
