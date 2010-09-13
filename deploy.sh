#!/usr/bin/env bash

./compress.sh
git add .
git ci -m"deployment: compress CSS and JS"
jekyll
rsync -avz --delete _site/ mattread.com:/var/www/mattread/htdocs/jekyll
