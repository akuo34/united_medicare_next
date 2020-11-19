import model from '../../database/model';
import bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD']
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async (req, res) => {

  await runMiddleware(req, res, cors);
  
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const response = await model.getAdmin(username);

    if (response) {
      bcrypt.compare(password, response.hash, (err, result) => {
        if (!err && result) {
          const claims = { sub: response._id, username: response.username, admin: true };
          const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '2h' });
          res.status(200).json({ authToken: jwt });
        } else {
          res.status(401).send('Incorrect password');
        }
      })
    } else {
      res.status(401).send('Invalid username');
    }
  }

  if (req.method === 'GET') {
    const token = req.headers.authorization.split(' ')[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token')
      } else {
        res.status(200).json({ user: decoded.username, admin: decoded.admin })
      }
    }); 
  }
}