/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */

import fs from "fs";
import path from "path";
import _ from "lodash";
import { cwd } from "process";
import parser from "./parser.js";

const makeAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const extension = (filepath) => path.extname(filepath);

const readFile = (file) => fs.readFileSync(file, "utf8");

const gendiff = (filepath1, filepath2) => {
  const path1 = makeAbsolutePath(filepath1);
  const path2 = makeAbsolutePath(filepath2);

  const obj1 = parser(path1);
  const obj2 = parser(path2);

  const diffData = (data) => {
    // eslint-disable-next-line default-case
    switch (data.status) {
      case "unchanged":
        return `${data.key}: ${data.value}`;
      case "changed":
        return [
          `-${data.key}: ${data.oldValue}`,
          `+${data.key}: ${data.newValue}`,
        ];
      case "deleted":
        return `-${data.key}: ${data.value}`;
      case "added":
        return `+${data.key}: ${data.value}`;
    }
    if (typeof data.value === "object") {
      const children = data.value;
      children.map(diffData);
    }
  };

  const entries1 = Object.keys(obj1);
  const entries = Object.keys(obj2);

  const keyData = _.union(entries1, entries).map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return obj1[key] === obj2[key]
        ? { key, value: obj1[key], status: "unchanged" }
        : {
            key,
            oldValue: obj1[key],
            newValue: obj2[key],
            status: "changed",
          };
    }
    return _.has(obj1, key)
      ? { key, value: obj1[key], status: "deleted" }
      : { key, value: obj2[key], status: "added" };
  });

  return keyData
    .flatMap(diffData)
    .sort((a, b) => {
      const regExp = /\+|-| /g;
      const newA = a.replace(regExp, "")[0];
      const newB = b.replace(regExp, "")[0];
      return newA >= newB ? 1 : -1;
    })
    .join("\n");
};

export { readFile, extension };
export default gendiff;
