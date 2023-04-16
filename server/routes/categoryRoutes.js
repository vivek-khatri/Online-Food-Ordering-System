const express = require('express')
const {
  categoryCreate,
  categoryList,
  categoryBySlug,
  categoryUpdate,
  categoryDelete,
  productsByCategory,
  categoryUploadImage,
  categoryRemoveImage,
} = require('../controllers/categoryControllers')

const router = express.Router()


router
  .route('/category')
  .post(categoryCreate)
  .get(categoryList)

router
  .route('/category/:slug')
  .get(categoryBySlug)
  .put(categoryUpdate)
  .delete(categoryDelete)
router.route('/categoryByCategory').post(productsByCategory)

module.exports = router
