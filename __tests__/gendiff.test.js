import gendiff from '../src/index';

test('проверка на нахождение разности в файлах с разными расширениями', () => {
  const expected = '-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n+pages: 224\n-timeout: 50\n+timeout: 20\n+verbose: true';
  expect(
    gendiff(
      '__tests__/test.file.json',
      '/home/liya/frontend-project-46/__tests__/test.file.yml',
    ),
  ).toEqual(expect.stringContaining(expected));
});

test('проверка на нахождение разности в файлах с разными путями', () => {
  const expected = '-follow: false\nhost: hexlet.io\n-proxy: 123.234.53.22\n-timeout: 50\n+timeout: 20\n+verbose: true';
  expect(
    gendiff(
      '__tests__/test.file.json',
      '/home/liya/frontend-project-46/__fixtures__/file2.json',
    ),
  ).toEqual(expect.stringContaining(expected));
});
