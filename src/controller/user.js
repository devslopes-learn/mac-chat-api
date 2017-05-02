import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../model/user';

export default({ config, db }) => {
  let api = Router();

  // '/v1/user/add' - Create
  api.post('/add', (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name;

    newUser.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User saved successfully' })
    });
  });

  // '/v1/user/' - Read
  api.get('/', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  // '/v1/user/:id' - Read 1
  api.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

  // '/v1/user/:id' - Update
  api.put('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      }
      user.name = req.body.name;
      user.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'User info updated' });
      });
    });
  });

  // '/vq/user/:id' -Delete
  api.delete('/:id', (req, res) => {
    User.remove({
      _id: req.params.id
    }, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'User Successfully Removed'});
    });
  });

  return api;
}
