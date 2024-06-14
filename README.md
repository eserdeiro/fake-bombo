# Fake Bombo API

**Fake Bombo API** is an in-development API that mimics the basic functionalities of the popular 'Bombo' app. This project is designed for educational purposes to help developers understand and build similar APIs.

Furthermore, this API will be the foundation for a future Flutter application that I will develop, which will also serve as a 'fake' version of the 'Bombo' app. This ensures a seamless integration and scalability between the API and the Flutter application.

## Features

- **User Authentication**: Support for user registration, login, and session management.
- **Ticket Purchasing**: Allows users to buy tickets for various events.
- **Event Attendance**: Users can indicate their intention to attend events.
- **Event Management**: Administrators can create, update, and delete events.
- **Artist Management**: Administrators have the ability to add and manage artist profiles.
- **Comments**: Users can comment on events to share their experiences or opinions.
<!-- - **Notifications**: A basic notification system to keep users updated about event news and updates. -->

## Admin Features

- **Event and Artist Management**: Admins can add and manage details about events and artists, including schedules, descriptions, and associated media.
- **News Management**: Ability to post updates or news related to events, artists, or the app itself.

## Technologies Used

- **Backend**: NestJS (an extensible Node.js framework for building efficient and scalable server-side applications)
- **Database**: PostgreSQL (an advanced open-source relational database)
- **Authentication**: JWT (JSON Web Tokens) for secure and scalable user authentication
- **Documentation**: Swagger (for API documentation, making it easier to maintain and consume the API)

## Installation

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
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seed

**Seed** The seed endpoint is a critical feature designed to initialize the database with initial data sets.

It acts as the starting point for setting up a pre-defined environment in your database. 

By accessing http://localhost:3000/seed, you can insert initial data into the database, which is crucial for setting up a predefined test environment or for starting the application with a basic set of data. 
> [!CAUTION]
> This will delete all existing data in the database and overwrite it with the seed data.

## Stay in touch

- Author - [eserdeiro](https://github.com/eserdeiro)
- Website - [github](https://github.com/eserdeiro)
- Twitter - [@emanuelserdeiro](https://twitter.com/emanuelserdeiro)