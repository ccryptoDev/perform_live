#!/bin/sh
git submodule update --init
git config --global submodule.recurse true
git submodule update --remote --rebase
