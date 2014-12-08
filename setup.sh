#!/bin/sh
(
cd ./emhub/emhub-js/
if [ `which brew` ];then
    brew install npm
elif [ `which apt-get` ];then
    sudo apt-get install npm
fi
npm install
bower install
)
