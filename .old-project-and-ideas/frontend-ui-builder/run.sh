#!/bin/bash

if [ "$1" = "install" ]; then
    cd ./transformer/ && npm install & npm install
else
    cd ./transformer/ && npm run app & npm run dev
fi