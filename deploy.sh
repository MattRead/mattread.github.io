#!/usr/bin/env bash

./compress
jekyll
rsync -avz --delete _site/ mattread.com:/var/www/mattread/htdocs/jekyll
git push
