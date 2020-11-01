import model from '../../database/model';

export default (req, res) => {

  if (req.method === 'POST') {
    const { images, about, phone, email } = req.body;
    model.postAbout(images, about, phone, email)
    .then(() => res.status(201).send('posted to database'))
    .catch(err => res.status(400).send(err));
  }
}