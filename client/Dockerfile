FROM node:23

WORKDIR /usr/src/app

COPY ./client .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]