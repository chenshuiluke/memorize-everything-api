FROM node:current-bullseye
WORKDIR /app
RUN apt-get update && apt-get install npm nodejs -y