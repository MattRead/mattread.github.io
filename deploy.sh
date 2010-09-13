#!/usr/bin/env bash
jekyll && rsync -avz --delete _site/ mattread.com:/var/www/mattread/htdocs/jekyll
