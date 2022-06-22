FROM ubuntu:jammy
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install npm nodejs -y