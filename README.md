# What has been done so far
- Monitoring using Prometheus, Grafana, Node-explorer & CAdvisor
- api gateway
- docker-swarm for deployment
- Assure that you can create newer images based on BE & FE updates
- persistent DB
- management of Docker Swarm services with Portainer

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
- after running `run.sh` script give it around 5 mins before backend will be up and running
- use `clean.sh` to stop services and remove pruned containers

# Portainer
Management of the Docker Swarm infrastructure. It is used as an visual interface to control the container environment.

To start the portainer containers run:
```
./run-portainer
```

To stop the portainer containers run:
```
./clean-portainer
```

Check that the services in the *portainer* stack are fully created, then access it throught `localhost:9010` in the web browser. Log in using the username *admin* and password *adminidp2022*.

Add a new stack with the name *idp_project* and paste the content of the `stack.yml` file, wait until all services are up and running.
