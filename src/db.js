import mongoose from 'mongoose';
import mongodb from 'mongodb';
import config from './config';

export default callback => {
  let db = mongoose.connect(config.mongoUrl);
  // let db = mongodb.MongoClient.connect(process.env.MONGODB_URI);
  callback(db);
}
