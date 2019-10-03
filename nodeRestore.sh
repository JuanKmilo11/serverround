#!/bin/bash
idNode = "$(pidof node)"
kill -2 $idNode
cd serverround
node server.js
