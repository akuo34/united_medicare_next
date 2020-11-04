import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD']
});

const useMiddleWare = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    })
  })
}

export default useMiddleWare;