const mongoose = require('mongoose');
const bluebrid = require('bluebird');
const env = require('../../env/env')

/**
 * ket noi DB
 */

const connectDB = ()=> {
  mongoose.Promise = bluebrid;
  // let DB_CONNECTION = 'mongodb';
  // let DB_HOST = 'localhost';
  // let DB_PORT = '27017';
  // let DB_NAME = 'tmdu_chat';
  // let DB_USERNAME = '';
  // let DB_PASSWORD = '';
  // mongodb://localhost:27017/tdmu_chat
  //let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}/${DB_NAME}`;
  let URI = `${env.DB_CONNECTION}://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
  mongoose.set('useFindAndModify', false);

  return mongoose.connect(URI,{useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,});

}

module.exports = connectDB;
