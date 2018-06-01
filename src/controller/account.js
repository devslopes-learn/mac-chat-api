import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import Account from '../model/account';
import UserDataExt from './extensions/userData-ext';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
  let api = Router();

  // '/v1/account/register'
  api.post('/register', (req, res) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
      } else if (userData) {
        res.status(300).json({ message: `Email ${req.body.email} is already registered`});
      } else {
        Account.register(new Account({ username: req.body.email }), req.body.password, function(err, account) {
          if(err) {
            res.status(500).json({ message: err });
          } else {
            passport.authenticate('local', { session: false })(req, res, () => {
              res.status(200).send('Successfully created new account');
            });
          }
        });
      }
    });
  });

  // '/v1/account/login'
  api.post('/login', (req, res, next) => {
		UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}`});
      } else {
				next();
			}
    });
	}, passport.authenticate('local', { session: false, scope: [], failWithError: true }), (err, req, res, next) => {
		if (err) {
			res.status(401).json({ message: `Email or password invalid, please check your credentials`});
		}
	}, generateAccessToken, respond);

  // '/v1/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  api.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  return api;
}
