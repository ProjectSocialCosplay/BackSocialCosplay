FROM node:14.15.4
RUN apt-get update

WORKDIR /home/app
COPY . .

RUN npm install
