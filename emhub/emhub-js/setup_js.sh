#!/bin/sh

if [ `which brew` ]; then
    brew install npm
elif [ `which apt-get`  ]; then
    sudo apt-get -y install npm
elif [ `which yum`  ]; then
    sudo yum -y install npm
else
    echo "npm install command is not found."
    exit 1
fi
npm link
npm install bower
bower install
tsd query jqueryui --resolve --save --action install
exit 0
