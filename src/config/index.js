import mongodb from 'mongodb';

export default {
   //"port": 3005,
   //"mongoUrl": "mongodb://localhost:27017/slacky-chat-api",
  "port": process.env.PORT,
  "mongoUrl": process.env.MONGODB_URI,
  "bodyLimit": "100kb"
}
