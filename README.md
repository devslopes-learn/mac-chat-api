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

#####Getting Started

1.  Clone this repo and navigate into the main directory
2.  From terminal run `sudo npm install`
3.  Starting the app:
  *  If mongod isn't already running, open a new terminal tab or window and enter `mongod` (then go back to your previous terminal window)
  *  If you want debug logging run from terminal `DEBUG=dev node main.js` or `DEBUG=dev nodemon main.js` if you use nodemon
  *  Omit `DEBUG=dev` if you don't want logging: `node main.js`
