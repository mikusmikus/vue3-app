#!/usr/bin/env sh
#//// bash deploy.sh
# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/mikusmikus/my-vue-project.git master:gh-pages

cd -