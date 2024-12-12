# Upload and Analysis App
A secure, robust full-stack system where users can upload files, the backend processes and extracts data, and the frontend displays processed results with advanced features.

## Getting started
To initialize all (api, client and database), you'll need to run as containers using Docker Compose
```
docker compose up --build
```

## Core features
- Implementing JWT Authentication guard
- Implementing Admin Role guard
- Hashing Passwords before registering

## Technologies Used
- Nest.js used to build the server side
- Next.js used to build the client side
- TypeORM used as the ORM for database
- Postgres used as the database engine
- JWT used as authentication
- Argon2 used for password hashing
- Context API for global state management
- React Query for query management
- Docker for each app containerization
- pgAdmin for GUI to Postgres Database
