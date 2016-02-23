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
sudo npm link
sudo npm install -g bower
bower install
npm install -g grunt
tsd query jqueryui --resolve --save --action install
exit 0
