import model from '../../../database/model';

export default (req, res) => {
  const {
    query: { _id },
  } = req;

  if (req.method === 'PUT') {
    const request = req.body;
    model.putProduct(request, _id)
      .then(() => res.status(200).send('updated to database'))
      .catch(err => res.status(400).send(err));
  }

  if (req.method === 'DELETE') {
    model.deleteProduct(_id)
      .then(() => res.status(200).send('deleted from database'))
      .catch(err => res.status(400).send(err));
  }

  if (req.method === 'GET') {
    model.getOneProduct(_id)
      .then(response => res.status(200).send(response))
      .catch(err => res.status(404).send(err));
  }
}