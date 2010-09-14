#!/bin/bash

echo "compressing CSS"
cd css/
cat tables.css syntax.css style.css fonts/dejavu_serif/stylesheet.css > screen.css
yui-compressor --type css screen.css > screen-min.css
cd ..
echo "compressed CSS to screen-min.css"
