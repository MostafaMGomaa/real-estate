# Real Estate Matching System

## Project Overview

This project implements a backend system for a real estate application where clients can make property requests, agents can create property ads, and admins can oversee the system. The application uses Node.js, MongoDB, and Mongoose.

## Features

- User Roles: Clients, Agents, and Admins
- Property Requests: Clients can create and refresh property requests
- Property Ads: Agents can create property ads
- Matching System: Matches property requests with relevant ads
- Admin Statistics: Admins can get statistics about ads and requests
- Authentication: JWT-based authentication and role-based authorization

## Tech Stack

Backend: Node.js
Database: MongoDB
ODM: Mongoose

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

- Clone the repository
- Run `npm install`
- Create a `.env` file in the root directory and add the following variables:
  - `PORT`: The port number the server will run on
  - `DATABASE`: The URI of the Dev MongoDB database
  - `DATABASE_TEST`: The URI of the Test MongoDB database
  - `JWT_COOKIE_EXPIRES_IN`: The number of days before the JWT cookie expires
  - `JWT_EXPIRES_IN`: The number of days before the JWT expires
  - `JWT_SECRET`: The secret used to sign the JWTs
- Run `npm run dev`

## API Documentation

The **SWAGGER** API documentation can be found [here](- https://app.swaggerhub.com/apis/MostafaGomaa/real-estate/1.0.0).

## Running Tests

- Run `npm run test`

## Sample DB Backup File

A sample database backup file is provided in the db_backup folder. To restore the backup, use the following command:

```bash
mongorestore --uri="mongodb://localhost:27017/<DB_NAME>" --drop ./db_backup/<DB_NAME>
```

## Assumptions and Decisions

- Used JavaScript instead of TypeScript because after searching, developers who work with you typically list JavaScript rather than skills gained in the company on LinkedIn.
- Used $facet for pagination instead of find().skip().limit() because:
  - Reduces server performance by minimizing the number of database calls.
  - Prevents data inconsistency issues that may arise from items being added or deleted between separate database calls. -`$facet` allows multiple aggregation pipelines to process within a single stage on the same input documents. Each sub-pipeline's results are stored in the output document as an array of documents.
- Made projections and leveraged the power of indexes to improve performance.
- Used faker to generate seed data and mongodump to create a database backup.
