#!/bin/bash

cat tables.css syntax.css style.css > screen.css
yui-compressor --type css screen.css > screen-min.css
