FROM node:9.5.0

WORKDIR /src

COPY package.json .
RUN npm install --quiet