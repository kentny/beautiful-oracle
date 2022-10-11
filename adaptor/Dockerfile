FROM node:16

RUN npm install -g json-server

WORKDIR /app

CMD [ "json-server", "--watch", "db.json", "--host", "0.0.0.0" ]