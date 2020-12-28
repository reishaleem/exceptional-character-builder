# The Exceptional Outliner - Magic Systems

A smaller version of the Exceptional Outliner that focuses on Magic Systems. It is running on an AWS EC2 instance [here](http://ec2-52-91-119-81.compute-1.amazonaws.com/).

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

In the `app` directory, create a `.env` file and paste the following inside.

```
REACT_APP_TINYMCE_API_KEY=<tiny mce api key>
REACT_APP_BACKEND_URI=http://localhost:5000
```

Remember that you need to add REACT_APP at the beginning of each environment variable here.

##### Starting the app

Now run the following command. It should start the application at `http://localhost:3000`.

```
$ npm start
```

#### Starting the backend Express server

##### Setting up `.env` file

Go back to the root directory and create a `.env` file and paste the following inside.

```
PORT=<port number>
MONGO_URI=<uri to database (can use local mongo instance)>
FRONTEND_URL=<frontend url (defaults to localhost:3000)>
JWT_SECRET=<jwt secret>
REFRESH_JWT_SECRET=<refresh jwt secret>
```

For the jwt secrets, it's fine to generate your own for your local machine. To do so, first starts `node`.

```
$ node
```

Then use the `crypto` package to generate the random string. You can run this command twice to get a different secret for the refresh token.

```
require('crypto').randomBytes(64).toString('hex)
```

##### Starting the server

Now run the following command. It should start the server at whatever port you specify in your `.env` file, defaulting to `localhost:5000`.

```
$ node server.ts
```

While in development, you may want to use `nodemon` instead of `node`, to automatically refresh the server when you make a change.

## Deployment

Deploying changes is a bit of a hassle, as there is no pipeline setup to do it automatically. Right now, you must take the following steps.

Log into the AWS EC2 instance using the following command.

```
$ ssh -i <path to pem key> ubuntu@ec2-52-91-119-81.compute-1.amazonaws.com
```

Then navigate to the app and pull any changes from git.

```
$ cd /var/www/exceptional-magic-outliner
$ git pull
```

Add the `.env` files detailed above into the directory on AWS, if they do not already exist. Install new dependencies and compile the React and Express code into Javascript

```
$ npm install   // install backend dependencies
$ npx tsc       // compile backend code into Javascript
$ cd app
$ npm install   // install frontend dependencies
$ npm run build // compile the React code
$ cd ..         // go back to root directory to start server
```

Finally, you can start the application.

```
// starts the app indefinitely
$ pm2 start server/build/server.js

// starts the app temporarily
$ node server/build/server.js
```

### Issues with building on AWS

Running `npm run build` takes a lot of CPU, and due to the instance being the free tier, it doesn't have a lot of power to give. So the build will either take a very long time or even time out. To avoid this, I've been building on my local machine, then using `sftp` to move the build directory straight to AWS. I don't want to push it to git, even though that would make things easier, because of how large these builds can be.

To use `sftp` to transfer the files, do the following steps.

First, build the React code the same way detailed above.

Then perform the following step to start the `sftp` client. You should start from the `app` directory.

```
$ sftp -i <path to pem key> ubuntu@ec2-52-91-119-81.compute-1.amazonaws.com
```

From here, you can navigate to the repository and add the build directory from your local machine by doing these commands.

```
$ cd /var/www/exceptional-magic-outliner/app
$ put -r build
```

## Security

Authentication and authorization is implemented in this app, with authorization being done using JwT. Since this is just a side project meant for learning, I'm documenting how it works, but normally I probably wouldn't put this in the readme.

### Login

Authentication occurs either at the login screen or at the register screen. Using `bcrypt`, the server takes the email and password combination and checks it against the saved email and hashed password in the database. If it matches, it issues a JwT token and refresh token. In the case of a user creating a new account, the email and password will of course match, given it's the same email and password used to create the account in the first place.

### Access Tokens

Access tokens expire quickly, in this case, after two minutes. When the user makes a request, the access token is sent in the `authorization` header. The server then checks that token and ensures it matches the proper encryption with the JwT Secret used. It's used similarly to Express middleware, but it isn't exactly the same, as it instead runs before each protected endpoint and returns the payload, rather than using `next()`. Then from there, whatever service is required can use the payload that was sent.

#### Storing the Access Token

Access tokens are stored in memory on the front end. All auth related services for the frontend are in `app/src/services/auth.service.tsx`. There, you will see the variable `accessToken`, as well as a getter and setter for it. The way that we check if a user is logged in is through the access token, as it will be blank if they are not logged in. One potential issue with storing it this way is that when the access token changes via a refresh, the React app itself might not re-render, and therefore, if there is a stored `getCurrentUser()` call, it will remain the old value. But I haven't found a way this has been a problem yet, because I haven't encountered a position where that lack of an update actually changes anything.

### Refresh Tokens and Refreshing the Access Token

Along with an access token, a refresh token is issued at login. While access tokens expire quickly, refresh tokens last longer, 7 days in this app. The main point of the refresh token is to ensure the user does not have to keep logging in after their access token expires after 2 minutes. The refresh token is not stored in memory, instead being stored as an HTTP Only cookie. The refresh token is used when a request is sent. Using the `apollo-link-token-refresh` library, when making the Apollo Client, it adds a link that checks if the current token is valid, and if it is not, then it will trigger a refresh. In the backend, it simply generates a new token and sends it back, and then we store the new token in memory on the frontend.

### Logout

When the user logs out, the Apollo Client cache is reset, and the logout mutation is executed. All the mutation does is send back a response with a cleared refresh token in the cookies. Then on the frontend, the `accessToken` variable is set to `""`, to signal there is no token and hence the user is logged out.
