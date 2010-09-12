#!/bin/bash

echo "compressing CSS"
cd css/
cat tables.css syntax.css style.css > screen.css
yui-compressor --type css screen.css > screen-min.css
echo "compress CSS to screen-min.css"
