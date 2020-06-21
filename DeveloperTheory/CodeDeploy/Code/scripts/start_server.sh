#!/bin/bash
cd /tmp/

# set any env variables
export NODE_ENV=staging
source /home/ec2-user/.bash_profile

pm2 delete all
pm2 start index.js --name MyAPI