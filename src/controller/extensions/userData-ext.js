import mongoose from 'mongoose';
import UserData from '../../model/user';

class UserDataExt {

  static findUserByEmail(email, callback) {
    UserData.findOne({ 'email': email }, (err, userData) => {
      if (err) {
        return callback(err, null);
      } else{
        return callback(null, userData);
      }
    });
  }
}

export default UserDataExt;
