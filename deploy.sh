#!/bin/bash

./node_modules/.bin/next build && 
docker build . -t oppa_staking