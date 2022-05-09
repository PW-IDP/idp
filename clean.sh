#! /bin/bash
docker stack rm idp_project
docker kill $(docker ps -q)
docker container prune
docker image prune