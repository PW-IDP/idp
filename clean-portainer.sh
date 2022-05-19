#! /bin/bash
docker stack rm portainer
docker kill $(docker ps -q)
docker container prune
docker image prune