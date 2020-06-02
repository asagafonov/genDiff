#!/usr/bin/env node
import { program } from 'commander';
import compareObjects from '../src/index.js';

const genDiff = program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => compareObjects(filepath1, filepath2));

program.parse(process.argv);

export default genDiff;
