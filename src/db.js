import mongoose from 'mongoose';
import mongodb from 'mongodb';
import config from './config';

export default callback => {
  let db;
  // Connect to the database before starting the application server.
  // mongoose.connect(config.mongoUrl, function (err, database) {
  mongoose.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // console.log(config.mongoUrl);
    console.log(process.env.MONGODB_URI);
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
    callback(db);
  });
}
