# This file is auto generated, do not edit directly




FROM node:16-alpine AS BUILDER

WORKDIR /app


COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --all


ARG ENV_FILE_TYPE
COPY ./deployment/.env.$ENV_FILE_TYPE ./.env
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

CMD ["npm", "start"]
EXPOSE 3000
