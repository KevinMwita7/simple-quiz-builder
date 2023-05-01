# Toptal test task: Quiz Builder App

The app allows authenticated users to create their own quizzes and anonymous visitors
to take them and see how many questions they got right.

## Getting started

### Requirements
Please install the following software before running the project:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Redis](https://redis.io/docs/getting-started/)

### Running the project
Clone the project
```sh
git clone https://git.toptal.com/screening/Kevin-Mwita-Babu-2.git
```

cd into the project directory
```sh
cd Kevin-Mwita-Babu-2
```

Inside you will find two folders:
- server
- client

cd into the server directory and install the dependencies
```sh
cd server
npm i
```

Create a .env file for the environment variables
```sh
touch .env
```

Add the values for the following fields in the [.env](https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj) file
| Variable | PURPOSE |
| ------ | ------ |
| PORT | Port on which the server will listen for incoming requests |
| DEBUG | Namespace to be used by the logger. **Must be quizzer:*** |
| PG_USER | PostgreSQL user |
| PG_PASSWORD | PostgreSQL password |
| PG_DB | PostgreSQL database |
| SESSION_SECRET | Sign cookies |

Run database migrations and start the server
```
npx sequelize-cli db:migrate
npm start
```

cd into the client directory, install the dependencies and run the project
```sh
cd ../client
npm i
npm start
```

Open the browser on [localhost:3000](http://localhost:3000)

## License

MIT

