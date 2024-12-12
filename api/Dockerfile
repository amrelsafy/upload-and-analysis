FROM node:23

WORKDIR /usr/src/app

COPY ./api .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]