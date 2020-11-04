const model = require('../database/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const username2 = process.env.ADMIN2_USERNAME;
const password2 = process.env.ADMIN2_PASSWORD;

model.deleteAllAdmin()
  .then(() => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        model.postAdmin(username, hash, 'admin');
      })
    })

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password2, salt, (err, hash) => {
        model.postAdmin(username2, hash, 'admin');
      })
    })

  })