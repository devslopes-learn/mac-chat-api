import mongodb from 'mongodb';

export default {
  // "port": 3005,
  // "mongoUrl": "mongodb://localhost:27017/chat-api",
  "port": process.env.PORT,
  "mongoUrl": "mongodb://jonnyb:123456@ds155191.mlab.com:55191/chattychatchat"
  "bodyLimit": "100kb"
}
