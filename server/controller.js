const model = require('../database/model');

module.exports = {
  getProducts: (req, res) => {
    model.getProducts()
      .then(response => res.status(200).send(response))
      .catch(err => res.status(404).send(err));
  },
  postProduct: (req, res) => {
    const { images, name, prodId, description, category } = req.body;
    model.postProduct(images, name, prodId, description, category, [], [], [])
      .then(() => res.status(201).send('posted to database'))
      .catch(err => res.status(400).send(err));
  },
  putProduct: (req, res) => {
    const request = req.body;
    const { _id } = req.params;
    model.putProduct(request, _id)
      .then(() => res.status(200).send('updated to database'))
      .catch(err => res.status(400).send(err));
  },
  deleteProduct: (req, res) => {
    const { _id } = req.params;
    model.deleteProduct(_id)
      .then(() => res.status(200).send('deleted from database'))
      .catch(err => res.status(400).send(err));
  },
  getAbout: (req, res) => {
    model.getAbout()
      .then(response => res.status(200).send(response))
      .catch(err => res.status(404).send(err));
  },
  postAbout: (req, res) => {
    const { images, about, phone, email } = req.body;
    model.postAbout(images, about, phone, email)
      .then(() => res.status(201).send('posted to database'))
      .catch(err => res.status(400).send(err));
  },
  putAbout: (req, res) => {
    const request = req.body;
    const { _id } = req.params;
    model.putAbout(request, _id)
      .then(() => res.status(200).send('updated to database'))
      .catch(err => res.status(400).send(err));
  },
  deleteAbout: (req, res) => {
    const { _id } = req.params;
    model.deleteAbout(_id)
      .then(() => res.status(200).send('deleted from database'))
      .catch(err => res.status(400).send(err));
  }
}