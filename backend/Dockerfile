FROM maven:3.6.0-jdk-11-slim AS build

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

COPY src /usr/src/app/backend/src
COPY pom.xml /usr/src/app/backend/
RUN mvn -f /usr/src/app/backend/pom.xml clean package

#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build /usr/src/app/backend/target/backend-0.0.1-SNAPSHOT.jar /usr/local/lib/backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/backend.jar"]
