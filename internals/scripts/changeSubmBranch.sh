#!/bin/sh

# If using Yarn, `yarn subm:update-branch <branch_name> <submodule_path>`
# If using NPM, `npm run subm:update-branch <branch_name> <submodule_path>`

git config -f .gitmodules submodule.$2.branch $1
cd $2
echo Branch to be changed to: $1
echo Submodule path on local: $2
git checkout -b $1 --track origin/$1
cd -
git submodule update --remote --rebase
