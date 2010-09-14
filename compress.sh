#!/bin/bash

echo "compressing CSS"
cd css/
cat tables.css syntax.css screen.css fonts/dejavu_serif/stylesheet.css > screen.tmp.css
yui-compressor --type css screen.tmp.css > screen-min.css
rm screen.tmp.css
cd ..
echo "compressed CSS to screen-min.css"
