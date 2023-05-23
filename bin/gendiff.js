#!/usr/bin/env node
/* eslint-disable no-console */
import { Command } from "commander";
import gendiff from "../src/formatters/index.js";

const program = new Command();
program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .option("-V, --version", "output the version number")
  .option("-f, --format <type>", "output format")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    const options = program.opts();
    if (options.format === "stylish" || options.format === undefined) {
      console.log(gendiff(filepath1, filepath2, "stylish"));
    }
    if (options.format === "plain") {
      console.log(gendiff(filepath1, filepath2, "plain"));
    }
    if (options.format === "json") {
      console.log(gendiff(filepath1, filepath2, "json"));
    }
  });
program.parse();
