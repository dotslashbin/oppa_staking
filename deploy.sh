#!/bin/bash

./node_modules/.bin/next build && 
docker build . -t oppa_staking &&
docker tag $(docker images | grep "oppa_staking" | awk '{print $3}' | head -n 1) dotslashbin/oppa_staking && 
docker push dotslashbin/oppa_staking