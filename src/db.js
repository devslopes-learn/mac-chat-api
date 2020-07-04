import mongoose from 'mongoose';
import config from './config';

export default callback => {
  let db;
  let retryCount = 0;

  let connectWithRetry = function() {
    return mongoose.connect(config.mongoUrl, function (err, database) {
      console.log("Trying to connect to mongodb...")
      if (err) {
        console.log("Waiting for 5 seconds to retry...")
        if (retryCount < 4) {
          setTimeout(connectWithRetry, 5000)
          retryCount++
          return
        }

        console.log(err);
        console.log("Giving up after 5 attempts...")
        proccess.exit(-1)
      }

      console.log(config.mongoUrl);
      // Save database object from the callback for reuse.
      db = database;
      console.log("Database connection ready");
      callback(db);
    });
  }
  // Connect to the database before starting the application server.

  connectWithRetry()
}
