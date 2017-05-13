import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Channel from '../model/channel';

import { authenticate } from '../middleware/authMiddleware';

module.exports.respond = function(socket){

    socket.on('newChannel',function(name, description){
      //Create channel
      let newChannel = new Channel({
        name: name,
        description: description,
      });
      //Save it to database
      newChannel.save(function(err, channel){
          //Send message to those connected in the room
          console.log('new channel created');
          socket.emit("channelCreated", channel.name, channel.description, channel.id);
        });
      });
}

export default({ config, db }) => {
  let api = Router();

  // '/v1/channel/' - Read
  api.get('/', authenticate, (req, res) => {
    Channel.find({}, (err, channels) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(channels);
    });
  });

  // '/v1/channel/:id' - Read 1
  api.get('/:id', authenticate, (req, res) => {
    Channel.findById(req.params.id, (err, channel) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(channel);
    });
  });

  // '/vq/channel/:id' -Delete
  api.delete('/:id', authenticate, (req, res) => {
    User.remove({
      _id: req.params.id
    }, (err, channel) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({ message: 'Channel Successfully Removed'});
    });
  });

  return api;
}
