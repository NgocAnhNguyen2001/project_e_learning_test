import fs, { truncate } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const configs: GitlabCiConfig[] = [{
  path: 'frontend',
  name: 'frontend',
  branchs: {
    main: {
      targetImage: 'registry.gitlab.com/novalearn/core/novalearn-production-frontend:latest',
      envFileType: 'production',
    },
    staging: {
      targetImage: 'registry.gitlab.com/novalearn/core/novalearn-staging-frontend:latest',
      envFileType: 'staging',
    },
    ['test-ci']: {
      targetImage: 'registry.gitlab.com/novalearn/core/test:frontend',
      envFileType: 'staging',
    },
  },
}, {
  path: 'admin',
  name: 'admin',
  branchs: {
    main: {
      targetImage: 'registry.gitlab.com/novalearn/core/novalearn-production-admin:latest',
      envFileType: 'production',
    },
    staging: {
      targetImage: 'registry.gitlab.com/novalearn/core/novalearn-staging-admin:latest',
      envFileType: 'staging',
    },
    ['test-ci']: {
      targetImage: 'registry.gitlab.com/novalearn/core/test:admin',
      envFileType: 'staging',
    },
  },
}, {
  path: 'backend',
  name: 'backend',
  branchs: {
    main: {
      targetImage: 'registry.gitlab.com/novalearn/core/novalearn-production-backend:latest',
    },
    staging: {
      targetImage: 'registry.gitlab.com/novalearn/core/novalearn-staging-backend:latest',
    },
    ['test-ci']: {
      targetImage: 'registry.gitlab.com/novalearn/core/test:backend',
    },
  },
}];

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootFolder = resolve(__dirname, '..');



await generateGitlabCi(configs, rootFolder);
console.log('done');



async function generateGitlabCi(configs: GitlabCiConfig[], outputPath: string) {
  let files: Record<string, string> = {
    ...generateGitlabCiFile(configs),
  };
  for (const relative in files) {
    const writePath = resolve(outputPath, relative);
    await writeFile(writePath, `
# This file is auto generated, do not edit directly


${files[relative].trim().replace(/\n\s*(?=\n)/g, '')}
`);
    console.log(`Written to ${writePath}`);
  }
}

function generateGitlabCiFile(configs: GitlabCiConfig[]) {
  return {
    [`.gitlab-ci.yml`]: `
before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

image: docker:latest

stages:
  - build-app

${configs.map(config => `
${config.name}:
  stage: build-app
  rules:
${Object.entries(config.branchs).map(([branch, branchConfig]) => `
    - if: $CI_COMMIT_BRANCH == "${branch}"
      changes:
        - .gitlab-ci.yml
        - ${config.path}/**/*
      variables:
        TARGET_IMAGE: ${branchConfig.targetImage}
${branchConfig.envFileType ? `
        ENV_FILE_TYPE: ${branchConfig.envFileType}
` : ``}
`).join('\n')}
  variables:
    DOCKERFILE_PATH: ${config.path + '/Dockerfile'}
  script:
    - docker build --pull -t $TARGET_IMAGE ${config.path} -f $DOCKERFILE_PATH --build-arg ENV_FILE_TYPE=$ENV_FILE_TYPE
    - docker push -q $TARGET_IMAGE
`).join('\n')}
`,
  }
}

async function writeFile(path: string, data: string) {
  await fs.promises.mkdir(resolve(path, '..'), { recursive: true });
  await fs.promises.writeFile(path, data);
}

type GitlabCiConfig = {
  path: string,
  name: string,
  isExternal?: boolean,
  runTest?: boolean,
  /**
   * first is name
   * 
   * second is value
   */
  testEnvs?: [string, string][],
  branchs: {
    [branch: string]: {
      targetImage: string,
      envFileType?: string,
    },
  }
}
