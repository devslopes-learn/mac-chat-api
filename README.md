# mac-chat-api
Prebuilt api for slack app clone.

This project is the API for creating a slack clone.  No need to understand any of code here.  But if you are interested in taking
your development skills to the next level, check out our API course.

#####How It Works

1.  User account creation and login are built-in using passport
  *  Login at `/login`
  *  Create a new user account at `/signup`
2.  Ensure that you use the middleware function `isAuthenticated` for each of your new routes on any request that must first have an authenticated user
  *  Data that you want made to the public (without a user first loggin in) can omit the `isAuthenticated` middleware
3.  Currently the express app assumes the database is on the localhost. You can change the URL of the Mongo database to any location.

#####Dependencies
*  npm - the `package.json` file lists all of the npm dependencies

#### Devslopes REST API with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Automatically expose Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).
- Unit Testing with [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chail)

Getting Started
---------------

```sh
# Install dependencies
npm install

# Start local development live-reload server port 3005:
npm run dev

# Requests made in the form http://localhost:3003/localdev/v1/endpoint

# To build ES6 code
npm run build

```
