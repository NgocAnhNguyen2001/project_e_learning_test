import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const configs: DockerfileConfig[] = [{
  path: 'frontend',
  isFrontend: true,
  frontendSpecialFlag: true,
  port: 3000,
}, {
  path: 'admin',
  isFrontend: true,
  port: 3000,
}, {
  path: 'backend',
  isBackend: true,
  port: 3000,
}];

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootFolder = resolve(__dirname, '..');



await generateDockerfile(configs, rootFolder);
console.log('done');



async function generateDockerfile(configs: DockerfileConfig[], rootFolder: string) {
  let files: Record<string, string> = {};
  for (const config of configs) {
    files = {
      ...files,
      ...config.isFrontend ? generateFrontendDockerfile(config) : generateBackendDockerfile(config),
    };
  }
  for (const relative in files) {
    const writePath = resolve(rootFolder, relative);
    await writeFile(writePath, '# This file is auto generated, do not edit directly\n\n\n' + files[relative]);
    console.log(`Written to ${writePath}`);
  }
}

function generateFrontendDockerfile(config: DockerfileConfig) {
  const content = `
${config.frontendSpecialFlag ? `
FROM node:15.9-alpine AS BUILDER
` : `
FROM node:16-alpine AS BUILDER
`}
WORKDIR /app

${config.frontendSpecialFlag ? `
COPY package.json package-lock.json ./
RUN npm install
` : `
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --all
`}

ARG ENV_FILE_TYPE
COPY ./.env.$ENV_FILE_TYPE ./.env
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

CMD ["npm", "start"]
EXPOSE ${config.port}
`;
  return {
    [`${config.path}/Dockerfile`]: content,
  }
}

function generateBackendDockerfile(config: DockerfileConfig) {
  const content = `
FROM node:16-alpine AS BUILDER
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --all

COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm run prisma:generate

COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build



FROM node:16-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --all

COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm run prisma:generate
# Reuse cache end

COPY --from=BUILDER /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=BUILDER /app/prisma/migrations ./prisma/migrations
COPY --from=BUILDER /app/dist ./dist

CMD ["sh", "-c", "yarn migrate:deploy && yarn start"]
EXPOSE ${config.port}
`;
  return {
    [`${config.path}/Dockerfile`]: content,
  }
}

async function writeFile(path: string, data: string) {
  await fs.promises.mkdir(resolve(path, '..'), { recursive: true });
  await fs.promises.writeFile(path, data);
}

type DockerfileConfig = {
  path: string,
  port: number,
  isFrontend?: boolean,
  isBackend?: boolean,
  generateTest?: boolean,
  frontendSpecialFlag?: boolean,
}
