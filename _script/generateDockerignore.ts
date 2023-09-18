// npx ts-node --esm --experimental-specifier-resolution=node generateDockerignore.ts

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const configs: Record<string, Config> = {
  'admin': {},
  'frontend': {},
  'backend': {},
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootFolder = resolve(__dirname, '..');



for (const [path, config] of Object.entries(configs)) {
  const data = await generateDockerignore(path, config);
  const writePath = resolve(rootFolder, path, '.dockerignore');
  await fs.promises.writeFile(writePath, data);
  console.log(`Written to ${writePath}`);
}
console.log('Done');



async function generateDockerignore(path: string, config: Config) {
  const output = [
    `
# This file is auto generated, do not edit it directly

Dockerfile
Dockerfile.test
.dockerignore
node_modules
.env
dist
`.trim()
  ];
  await fs.promises.readFile(resolve(rootFolder, path, '.gitignore'))
    .then(buf => output.push('# Copied from .gitignore\n' + buf.toString()))
    .catch(err => void err);
  return output.join('\n\n\n');
}

interface Config { }
