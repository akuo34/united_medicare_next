const router = require('express').Router();
const controller = require('./controller');

router
  .route('/products')
  .get(controller.getProducts)
  .post(controller.postProduct)

router
  .route('/products/:_id')
  .put(controller.putProduct)
  .delete(controller.deleteProduct)

router
  .route('/about')
  .get(controller.getAbout)
  .post(controller.postAbout)

router
  .route('/about/:_id')
  .put(controller.putAbout)
  .delete(controller.deleteAbout)

module.exports = router;