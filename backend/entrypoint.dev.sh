#!/bin/sh

npm run migrate:deploy

npm run prisma:generate

echo "Migration successfull"

npm run seed



npm run start:dev
