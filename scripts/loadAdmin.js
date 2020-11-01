const model = require('../database/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

model.deleteAllAdmin()
  .then(() => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        model.postAdmin(username, hash);
      })
    })
  })