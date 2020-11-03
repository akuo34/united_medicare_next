const mongoose = require('mongoose');
const schema = require('./schema.js');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/united-medicare-next', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('United Medi-care connected'));

const ProductItem = mongoose.models.ProductItem || mongoose.model('ProductItem', schema.productSchema);
const AboutItem = mongoose.models.AboutItem || mongoose.model('AboutItem', schema.aboutSchema);
const AdminItem = mongoose.models.AdminItem || mongoose.model('AdminItem', schema.adminSchema);

module.exports.ProductItem = ProductItem;
module.exports.AboutItem = AboutItem;
module.exports.AdminItem = AdminItem;