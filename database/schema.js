const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  images: [{
    fireBaseUrl: String,
    filename: String
  }],
  name: String,
  prodId: String,
  description: String,
  category: String,
  features: [String],
  specs: [String],
  downloads: [{
    fireBaseUrl: String,
    filename: String,
    title: String,
  }]
});

const aboutSchema = new mongoose.Schema({
  images: [{
    fireBaseUrl: String,
    filename: String
  }],
  about: String,
  phone: String,
  email: String
});

const adminSchema = new mongoose.Schema({
  username: String,
  hash: String,
  role: String,
});

module.exports.productSchema = productSchema;
module.exports.aboutSchema = aboutSchema;
module.exports.adminSchema = adminSchema;