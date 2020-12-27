# The Exceptional Outliner - Magic Systems

A smaller version of the Exceptional Outliner that focuses on Magic Systems.

## Running the application

### Setup

#### Set VS Code Typescript Version to the current workspace version

Since VSCode uses `Typescript 4.0.3`, you will need to set the current version to `4.1.2` before continuing, or else you will get errors with the `react-jsx` setting on the `--jsx` option in the `tsconfig.json`. To change the setting, go to a file with a `.ts` or `.tsx` extension, press `Control+Shift+P`, type
"Typescript", and click "Select Typescript Version." Then, you will see an option to use the current workspace version.

#### Installing dependencies

In the root directory, run the following command to install the necessary dependencies. Then, run the same command in the `app` directory.

```
$ npm install
```

#### Starting the frontend React application

##### Setting up `.env` file

Create a `.env` file and paste the following inside.

```
Add whatever goes in the .env later...
```

##### Starting the app

In the `app` directory, run the following command. It should start the application at `localhost:3000`.

```
$ npm start
```

#### Starting the backend Express server

##### Setting up `.env` file

Create a `.env` file and paste the following inside.

```
PORT=<port number>
Add remaining stuff later...like database
```

##### Starting the server

In the root directory, run the following command. It should start the server at whatever port you specify in your `.env` file, defaulting to `localhost:5000`.

```
$ node server.ts
```

While in development, you may want to use `nodemon` instead of `node`, to automatically refresh the server when you make a change.

**_ note: to get random string for jwt secret, use require('crypto').randomBytes(64).toString('hex) _**
