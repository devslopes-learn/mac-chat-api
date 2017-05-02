import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String
})

module.exports = mongoose.model('User', userSchema);
