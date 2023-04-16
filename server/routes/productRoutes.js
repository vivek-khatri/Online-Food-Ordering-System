const express = require('express')
const {
  productCreate,
  uploadImage,
  removeImage,
  getProducts,
  deleteProducts,
  getProductDetails,
  updateProduct,
  countProducts,
  getProductsAdmin,
} = require('../controllers/productControllers')



const router = express.Router()


router
  .route('/product')
  .post(productCreate)
  .get(getProducts)
router.route('/product/:id').delete(deleteProducts)
router
  .route('/product/:slug')
  .get(getProductDetails)
  .put(updateProduct)

//Admin Product List with pagination
router.route('/productCount').get(countProducts)
router.route('/productListAdmin').post(getProductsAdmin)

module.exports = router
