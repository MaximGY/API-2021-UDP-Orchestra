FROM node:17

COPY src/* /var/opt/
WORKDIR /var/opt
RUN npm install

ENTRYPOINT ["node", "index.js"]