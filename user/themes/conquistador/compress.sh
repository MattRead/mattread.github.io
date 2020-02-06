#!/bin/bash

echo "compressing CSS"
cd css/
rm screen-min.css
cat screen.css tables.css blocks.css ../vendor/icomoon.css handheld.css ../vendor/jquery.fancybox.css > screen.tmp.css
yui-compressor --type css screen.tmp.css > screen-min.css
rm screen.tmp.css
cd ..
echo "compressed CSS to screen-min.css"

echo "compressing JS"
cd js/
rm site-min.js
cat ../vendor/jquery.fancybox.js site.js easteregg.js > site.tmp.js
yui-compressor --type js site.tmp.js > site-min.js
rm site.tmp.js
cd ..
echo "compressed JS to site-min.css"
