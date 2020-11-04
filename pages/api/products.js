import model from '../../database/model';

export default async (req, res) => {
  if (req.method === 'GET') {
    model.getProducts()
      .then(response => res.status(200).send(response))
      .catch(err => res.status(404).send(err));
  }
  
  if (req.method === 'POST') {
    const { images, name, prodId, description, category } = req.body;
    model.postProduct(images, name, prodId, description, category, [], [], [])
      .then(() => res.status(201).send('posted to database'))
      .catch(err => res.status(400).send(err));
  }
}
