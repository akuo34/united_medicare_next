const mongoose = require('mongoose');
const schema = require('./schema.js');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/united-medicare-next', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('United Medi-care connected'));

const productItem = mongoose.model('ProductItem', schema.productSchema);
const aboutItem = mongoose.model('AboutItem', schema.aboutSchema);
const adminItem = mongoose.model('AdminItem', schema.adminSchema);

module.exports.productItem = productItem;
module.exports.aboutItem = aboutItem;
module.exports.adminItem = adminItem;