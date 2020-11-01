const { productItem, aboutItem, adminItem } = require('./');

module.exports = {
  getProducts: () => productItem.find().sort([['category', 1]]),
  postProduct: (images, name, prodId, description, category, features, specs, downloads) => productItem.create({ images, name, prodId, description, category, features, specs, downloads }),
  putProduct: (request, _id) => productItem.findOneAndUpdate({ _id }, request),
  deleteProduct: (_id) => productItem.findOneAndDelete({ _id }),
  getAbout: () => aboutItem.find(),
  postAbout: (images, about, phone, email) => aboutItem.create({ images, about, phone, email }),
  putAbout: (request, _id) => aboutItem.findOneAndUpdate({ _id }, request),
  deleteAbout: (_id) => aboutItem.findOneAndDelete({ _id }),
  getAdmin: (username) => adminItem.findOne({ username }),
  postAdmin: (username, hash) => adminItem.create({ username, hash }),
  deleteAllAdmin: () => adminItem.deleteMany({})
}
