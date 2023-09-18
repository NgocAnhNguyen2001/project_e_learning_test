# This file is auto generated, do not edit directly




FROM node:15.9-alpine AS BUILDER

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install


ARG ENV_FILE_TYPE
COPY ./deployment/.env.$ENV_FILE_TYPE ./.env
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

CMD ["npm", "start"]
EXPOSE 3000
