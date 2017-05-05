import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String, default: "",
  email: String, default: "",
  avatarName: String, default: "",
  avatarColor: String, default: ""
});

module.exports = mongoose.model('User', userSchema);
