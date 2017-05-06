import mongoose from 'mongoose';
import mongodb from 'mongodb';
import config from './config';

export default callback => {
  var db;
  // Connect to the database before starting the application server.
  mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(process.env.MONGODB_URI);
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
    callback(db);
  });
}
