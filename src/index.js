import process from 'process';
import path from 'path';
import fs from 'fs';

const compareObjects = (fileName1, fileName2) => {
  const currentDirectory = process.cwd();
  const pathToObject1 = path.isAbsolute(fileName1) ? fileName1 : path.resolve(currentDirectory, String(fileName1));
  const pathToObject2 = path.isAbsolute(fileName2) ? fileName2 : path.resolve(currentDirectory, String(fileName2));
  const file1 = JSON.parse(fs.readFileSync(pathToObject1));
  const file2 = JSON.parse(fs.readFileSync(pathToObject2));

  console.log(file1, file2);
};

export default compareObjects;
