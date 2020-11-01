import model from '../../database/model';

export default async (req, res) => {
  const { username, password } = req.body;

  if (req.method === 'POST') {
    const { username, password } = req.body;
    model.postAbout(images, about, phone, email)
    .then(() => res.status(201).send('posted to database'))
    .catch(err => res.status(400).send(err));
  }
}