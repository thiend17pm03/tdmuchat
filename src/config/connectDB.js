const mongoose = require('mongoose');
const bluebrid = require('bluebird');

/**
 * ket noi DB
 */

const connectDB = ()=> {
  mongoose.Promise = bluebrid;
  let DB_CONNECTION = 'mongodb';
  let DB_HOST = 'localhost';
  let DB_PORT = '27017';
  let DB_NAME = 'tmdu_chat';
  let DB_USERNAME = '';
  let DB_PASSWORD = '';
  // mongodb://localhost:27017/tdmu_chat

  let URI = `${DB_CONNECTION}://${DB_HOST}/${DB_NAME}`;

  return mongoose.connect(URI,{useMongoClient : true});

}

module.exports = connectDB;
