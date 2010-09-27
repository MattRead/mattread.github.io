#!/usr/bin/env bash

./githubprojects.php
./compress.sh
git add .
git ci -m"deployment: compress CSS and JS"
ejekyll
rsync -avz _site/ mattread.com:/var/www/mattread/htdocs
