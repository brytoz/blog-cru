# Blog Application

This is a simple blog application built with NestJS, Prisma, and JWT for authentication.

 
## Installation

**Clone the repository**:
   git clone https://github.com/your-username/blog-application.git
   cd blog-application

## Install dependencies
npm install
npx prisma migrate dev --name init
npm run start:dev

## API Endpoints
Register: POST /users/register

Request Body: { "username": "string", "password": "string", "email": "string" }

Login: POST /users/login

Request Body: { "username": "string", "password": "string" } 

Create a Post: POST /posts

Headers: { "Authorization": "Bearer <access_token>" }
Request Body: { "vontent": "string", "image": "string", "username": "string" }
 
Get All Posts: GET /posts

Get Post by ID: GET /posts/:id

 Get Posts by Username: GET /posts/:username

 Get Post by Username and ID: GET /posts/:username/:id

 