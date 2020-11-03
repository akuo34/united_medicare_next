import model from '../../database/model';

export default (req, res) => {

  if (req.method === 'POST') {
    const { images, about, phone, email } = req.body;
    model.postAbout(images, about, phone, email)
    .then(() => res.status(201).send('posted to database'))
    .catch(err => res.status(400).send(err));
  }

  if (req.method === 'GET') {
    model.getAbout()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(404).send(err));
  }
}