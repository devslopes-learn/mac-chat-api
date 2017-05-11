import mongodb from 'mongodb';

export default {
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb"
}
