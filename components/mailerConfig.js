const nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: `${process.env.EMAILER_ACCOUNT}`, // your email address to send email from
    pass: `${process.env.EMAILER_PASSWORD}` // your gmail account password
  }
});

module.exports = transporter;