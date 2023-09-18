# This file is auto generated, do not edit directly



FROM node:16-alpine AS BUILDER
WORKDIR /app

RUN apk add --update --no-cache openssl1.1-compat

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --all

COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm run prisma:generate

COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build



FROM node:16-alpine
WORKDIR /app

RUN apk add --update --no-cache openssl1.1-compat

COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --all

COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npm run prisma:generate
# Reuse cache end

COPY --from=BUILDER /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=BUILDER /app/prisma/migrations ./prisma/migrations
COPY --from=BUILDER /app/dist ./dist

CMD ["sh", "-c", "yarn migrate:deploy && yarn start"]
EXPOSE 3000
