# Upload and Analysis App
A secure, robust full-stack system where users can upload files, the backend processes and extracts data, and the frontend displays processed results with advanced features.

## Getting started
To initialize all (api, client and database), you'll need to run as containers using Docker Compose
```
docker compose up --build
```
The app initializes with a super admin user to login with the classic admin credentials
Username: admin
Password: admin

## Core features
- Implementing JWT Authentication guard
- Implementing Admin Role guard
- Hashing Passwords before registering

## File Upload
- Receiving single or multiple files through HTTP request as multipart form data
- Validating each file size and file type
- Queueing each file for processing asynchronously using NestJS Bull on top of local redis

## File Processing
- Extracting metadata and storing it in the database
- If file type is PDF => Parse using PdfParse to extract text content and store in the database
- If file type is Image => Parse using Tesseract.js to extract text content and store in the database
- If file type is CSV => Parse using Papaparse to extract and format data to text to store in the database

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
- NestJS Bull for Queuing processes
- PDFParse for Parsing PDF text content
- Tesseract.js for Reading text through image
- Papaparse for extracting data from CSV files
