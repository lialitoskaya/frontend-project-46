import { fileURLToPath } from "url";
import { dirname, join } from "path";
import gendiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = (filename) => join(__dirname, "..", filename);

test("проверка на нахождение разности в файлах с разными расширениями", () => {
  const expected =
    "-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n+pages: 224\n-timeout: 50\n+timeout: 20\n+verbose: true";
  expect(
    gendiff(
      absolutePath("__tests__/test.file.json"),
      absolutePath("__tests__/test.file.yml")
    )
  ).toEqual(expect.stringContaining(expected));
});

test("проверка на нахождение разности в файлах с разными путями", () => {
  const expected =
    "-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n-timeout: 50\n+timeout: 20\n+verbose: true";
  expect(
    gendiff(
      absolutePath("__tests__/test.file.json"),
      absolutePath("__fixtures__/file2.json")
    )
  ).toEqual(expect.stringContaining(expected));
});
