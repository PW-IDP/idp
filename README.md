# What has been done so far
- monitoring using Prometheus, Grafana, Node-explorer & CAdvisor
- api gateway
- docker-swarm for deployment
- create newer images based on BE & FE updates
- persistent DB
- management of Docker Swarm services with Portainer
- pipeline CI/CD (no stage for testing yet)

# What needs to be done
- Loki for logging
- rabbitMQ

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


# Gitlab CI/CD
Created two separate repositories for the front-end and back-end and add their own `Dockerfile` to create the images accordingly. Added `.gitlab-ci.yml` in both repos. (the address of the webhook needs to be added manually)

Create images for front-end and back-end and add them to the registry:
```
docker login gitlab.cs.pub.ro:5050
docker build -t gitlab.cs.pub.ro:5050/pw-idp-2022/pw-backend .
docker push gitlab.cs.pub.ro:5050/pw-idp-2022/pw-backend

docker login gitlab.cs.pub.ro:5050
docker build -t gitlab.cs.pub.ro:5050/pw-idp-2022/pw-frontend .
docker push gitlab.cs.pub.ro:5050/pw-idp-2022/pw-frontend
```

Create the Gitlab runner with the following commands:
```
docker run -d --name gitlab-runner --restart always -v gitlab-runner-config:/etc/gitlab-runner -v /var/run/docker.sock:/var/run/docker.sock gitlab/gitlab-runner:latest

docker run --rm -it -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner register

# to register use de following:
# https://gitlab.cs.pub.ro/
# Registration token
# Name of the runner
# Some tags
# docker
# docker:19.03

docker run -it -v gitlab-runner-config:/test alpine
```

Modify the `config.toml` file to grant privileged access.
```
privileged = true
volumes = ["/cache", "/var/run/docker.sock:/var/run/docker.sock"]

```

Restart the runner:
```
sudo docker restart gitlab-runner
```

To test, try making changes for the master branch and see if anything changes. :)


# Loki logging
Adjust the date and period of the logging in the `./configs/loki/loki.yml` file. Make sure that the `./configs/loki/` is created and that it has all permissions:
```
-rw-rw-r-- 1 student student 1074 May 19 21:42 loki.yml
drwxrwxrwx 2 student student 4096 May 20 21:48 wal
```

Start the containers by running `run.sh` script and wait for the services to be up and running. In the web browser access `localhost:3001` and enter username `admin` and password `admin`. Then create a `Loki` Data Source using `http://loki:3100` as url.

Access `localhost:30001/explore` to view the logging of the backend container.
