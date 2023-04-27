/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable default-case */
import yaml from "js-yaml";
import { readFile, extension } from "./index.js";

const parser = (file) => {
  switch (extension(file)) {
    case ".json":
      return JSON.parse(readFile(file));
    case ".yml":
      return yaml.load(readFile(file));
  }
};

export default parser;
