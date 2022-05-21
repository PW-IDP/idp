#! /bin/bash
# docker pull portainer/agent
# docker pull portainer/portainer-ce
docker stack deploy -c portainer-agent-stack.yml portainer
