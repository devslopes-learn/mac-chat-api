var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('user', UserSchema);