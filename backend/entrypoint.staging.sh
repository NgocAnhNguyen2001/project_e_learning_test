#!/bin/sh

npm run migrate:deploy

echo "Migration successfull"

npm run seed

npm run start
