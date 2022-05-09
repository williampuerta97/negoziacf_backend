# Negozia CF - API

## Installation

API requires [Node.js](https://nodejs.org/) v14+ to run.

1) Install the dependencies and devDependencies and start the server.

```sh
cd negozia_backend
npm i
npm start
```

2) Copy the .env.example file to .env then configure the variables

```sh
PORT=3003
SECRET_JWT_SEED=<your_secret_key>
MONGODB_CNN=mongodb://localhost:27017/negoziacf
```

