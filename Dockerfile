FROM node:current-bullseye
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install npm nodejs -y