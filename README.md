# What has been done so far
- Monitoring using Prometheus, Grafana, Node-explorer & CAdvisor
- api gateway 
- docker-swarm for deployment
- Assure that you can create newer images based on BE & FE updates

# What needs to be done
- Loki for logging
- rabbitMQ
- pipeline CI/CD
# Contents
- Kong
- Prometheus
- docker-swarm file
- scripts for running and removing containers

# Ports 
- FE runs on port 3000
- BE runs on port 8080
- Kong routes traffic from localhost:8080 to localhost:8000
- Prometheus was used for metrics monitoring, port=9090
- Grafana runs on port 3001
- CAdvisor runs on port 8081
- Node-explorer runs on port 9100

# Running
- after running `run.sh` script give it around 2 mins before backend will be up and running
- use `clean.sh` to stop services and remove pruned containers