FROM node:23

WORKDIR /usr/src/app

COPY ./client .

ENV BASE_API_URL=http://localhost:3000

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]