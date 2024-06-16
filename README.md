# Fake Bombo API

**Fake Bombo API** is a comprehensive and robust API designed to mimic the core functionalities of the popular 'Bombo' app. This project serves as a valuable educational resource for developers seeking to understand and build similar APIs.

## Key Features

- **User Authentication:** Secure user registration, login, and session management using JWT (JSON Web Tokens).
- **Event Management:** Comprehensive event management capabilities, including creation, update, deletion, and retrieval of event details.
- **Artist Management:** Efficient management of artist profiles, including adding, updating, and deleting artist information.
- **Ticket Purchasing:** Enables users to purchase tickets for various events.
- **Event Attendance:** Allows users to indicate their intention to attend events.
- **Comments:** Facilitates user engagement through commenting on events.
- **Admin Features:** Provides administrators with enhanced control over events, artists, and news content.

## Technologies

- **Backend:** NestJS, a powerful and scalable Node.js framework for building server-side applications.
- **Database:** PostgreSQL, a robust and reliable open-source relational database.
- **Authentication:** JWT (JSON Web Tokens) for secure and scalable user authentication.
- **Documentation:** Swagger, a comprehensive tool for API documentation, ensuring ease of maintenance and consumption.
- **Cloudinary:** Cloudinary, a cloud-based service for image and video storage and management, enhancing media handling capabilities.

## Installation and Setup

```powershell
# clone project 
$ git clone https://github.com/eserdeiro/fake-bombo-api

# execute
$ npm install

# clone '.env.template' and rename to '.env' and update your environment vars
$ cp .env.template .env

# up db
$ docker-compose up -d
```

## Running the app

```powershell

# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seed Data

The ``seed`` endpoint provides a convenient way to initialize the database with pre-defined data sets.

-   Access the seed endpoint: http://localhost:3000/api/seed
-   Note: This will delete all existing data in the database and overwrite it with the seed data.

## Contact

- Author - [eserdeiro](https://github.com/eserdeiro)
- Website - [github](https://github.com/eserdeiro)
- Twitter - [@emanuelserdeiro](https://twitter.com/emanuelserdeiro)