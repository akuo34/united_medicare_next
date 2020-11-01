import model from '../../../database/model';

export default (req, res) => {
  const {
    query: { _id },
  } = req;

  if (req.method === 'PUT') {
    const request = req.body;
    model.putAbout(request, _id)
      .then(() => res.status(200).send('updated to database'))
      .catch(err => res.status(400).send(err));
  }

  if (req.method === 'DELETE') {
    model.deleteAbout(_id)
      .then(() => res.status(200).send('deleted from database'))
      .catch(err => res.status(400).send(err));
  }
}