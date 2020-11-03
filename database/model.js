const { ProductItem, AboutItem, AdminItem } = require('./');

module.exports = {
  getProducts: () => ProductItem.find().sort([['category', 1]]),
  getOneProduct: () => ProductItem.findOne({ _id }),
  postProduct: (images, name, prodId, description, category, features, specs, downloads) => ProductItem.create({ images, name, prodId, description, category, features, specs, downloads }),
  putProduct: (request, _id) => ProductItem.findOneAndUpdate({ _id }, request),
  deleteProduct: (_id) => ProductItem.findOneAndDelete({ _id }),
  getAbout: () => AboutItem.find(),
  postAbout: (images, about, phone, email) => AboutItem.create({ images, about, phone, email }),
  putAbout: (request, _id) => AboutItem.findOneAndUpdate({ _id }, request),
  deleteAbout: (_id) => AboutItem.findOneAndDelete({ _id }),
  getAdmin: (username) => AdminItem.findOne({ username }),
  postAdmin: (username, hash) => AdminItem.create({ username, hash }),
  deleteAllAdmin: () => AdminItem.deleteMany({})
}
