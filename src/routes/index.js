import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initalizeDb from '../db';

let router = express();

//connect to db
initalizeDb(db => {

  //internal middleware
  router.use(middleware({config, db}));
  //api routes v1 (/v1)

});

export default router;
