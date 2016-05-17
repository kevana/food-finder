FROM node:6.1.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
VOLUME /data

CMD [ "npm", "start" ]
