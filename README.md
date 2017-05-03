# mac-chat-api
Prebuilt api for slack app clone.

This project is the API for creating a slack clone.  No need to understand any of code here.  But if you are interested in taking
your development skills to the next level, check out our API course.

#####How It Works

1.  User account creation and login are built-in using passport
  *  Login at `/v1/account/login`
  *  Create a new user account at `/v1/account/register`
2.  Ensure that you use the middleware function `authenticated` for each of your new routes on any request that must first have an authenticated user
  *  Data that you want made to the public (without a user first loggin in) can omit the `authenticated` middleware
3.  Currently the express app assumes the database is on the localhost. You can change the URL of the Mongo database to any location.

#####Dependencies
*  npm - the `package.json` file lists all of the npm dependencies

#### Devslopes REST API with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Automatically expose Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).

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
