import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Message from '../model/message';

import { authenticate } from '../middleware/authMiddleware';

module.exports.respond = function(socket){

  var typingUsers = {};

  //Listens for user typing.
  socket.on('startType', function(userName, channelId){
    console.log("User " + userName + " is writing a message...");
    typingUsers[userName] = channelId;
    socket.emit("userTypingUpdate", typingUsers, channelId);
  });

  socket.on('stopType', function(userName){
    console.log("User " + userName + " has stopped writing a message...");
    delete typingUsers[userName];
    socket.emit("userTypingUpdate", typingUsers);
  });

  //Listens for a new chat message
  socket.on('newMessage', function(messageBody, userId, channelId, userName, userAvatar, userAvatarColor) {
    //Create message

    console.log(messageBody);

    let newMessage = new Message({
    messageBody: messageBody,
    userId: userId,
    channelId: channelId,
    userName: userName,
    userAvatar: userAvatar,
    userAvatarColor: userAvatarColor
  });
    //Save it to database
    newMessage.save(function(err, msg){
      //Send message to those connected in the room
      console.log('new message sent');

      socket.emit("messageCreated",  msg.messageBody, msg.userId, msg.channelId, msg.userName, msg.userAvatar, msg.userAvatarColor, msg.id, msg.timeStamp);
    });
  });

}

export default({ config, db }) => {
  let api = Router();

  // '/v1/message/:id' - Update
  api.put('/:id', authenticate, (req, res) => {
    Message.findById(req.params.id, (err, message) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      message.messageBody = req.body.messageBody;
      message.userId = req.body.userId;
      message.channelId = req.body.channelId;
      newMessage.userName = req.body.userName;
      newMessage.userAvatar = req.body.userAvatar;
      newMessage.userAvatarColor = req.body.userAvatarColor;

      message.save(err => {
        if (err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Message updated' });
      });
    });
  });

  // '/v1/message/byChannel/:channelId'
  api.get('/byChannel/:channelId', authenticate, (req, res) => {
    Message
      .find({ 'channelId' : req.params.channelId }, (err, messages) => {
        if(err) {
          res.status(500).json({ message: err });
        }
        res.status(200).json(messages);
      });
  });

  // '/vq/message/:id' -Delete
  api.delete('/:id', authenticate, (req, res) => {
    Message.remove({
      _id: req.params.id
    }, (err, message) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Message Successfully Removed'});
    });
  });

  // '/v1/message/' - Delete all
  api.delete('/', authenticate, (req, res) => {
    Message.find({}, (err, users) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Users All Removed'});
    });
  });

  return api;
}
