# TaskMaster

### A Simple Task Manager App made withg Nest JS

TaskMaster is a Task Manager application built with NestJS and uses ExpressJS and NodeJS behind the scenes.

### Features

- Robust AUthentication System using NestJS guards
- Demonstrating CRUD functionality for Tasks created by users
- Authorization mechanisms to prevent Unauthorized access to resources
- Logging Mechanisms to see what went wrong with the application
- Production grade coding practices followed

### Installation

Copy the git url and clone it in the required folder

```sh
git clone https://github.com/adwait-kalsekar/taskmaster.git
```

Install the dependencies and devDependencies and start the server.

```sh
cd taskmaster
npm i
```

Setup postgresql Database:

- Download postgresql and run it on port 5432
- Or run a docker instance of postgresql and map to local port 5432
- Open PG Admin or any other DBMS Software to connect to the postgresql server
- Create a database - taskmaster

While postgresql running, start the app in development mode

```sh
npm run start:dev
```
