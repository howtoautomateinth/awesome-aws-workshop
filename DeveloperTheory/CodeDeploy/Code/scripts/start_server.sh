#!/bin/bash
source /home/ec2-user/.bash_profile
cd /tmp/nodejsapp

npm install

# set any env variables
export NODE_ENV=staging

pm2 delete all
pm2 start index.js --name HTAHelloWorld