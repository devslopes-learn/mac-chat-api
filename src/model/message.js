import mongoose from 'mongoose';
import User from './user';
import Channel from './channel';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new Schema({
  body: String, default: "",
  timeStamp: type: Date, default: Date.now,
  userId: ObjectId, ref: 'User',
  channelId: ObjectId, ref: 'Channel'
});

module.exports = mongoose.model('Message', messageSchema);
