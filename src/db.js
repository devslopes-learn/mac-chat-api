import mongoose from 'mongoose';
import mongodb from 'mongodb';
import config from './config';

export default callback => {
  // let db = mongoose.connect(config.mongoUrl);
  let db = mongodb.MongoClient.connect(process.env.MONGODB_URI);
  // let db = mongodb.MongoClient.connect("mongodb://jacob:123456@ds133281.mlab.com:33281/heroku_xl364tn7");
  callback(db);
}
