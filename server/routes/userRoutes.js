const express = require('express')
const {
  userList,
  saveShippingAddress,
  userDetails,
  addToWishlist,
  removeFromWishlist,
  wishlistData,
} = require('../controllers/userControllers')

const router = express.Router()

router
  .route('/users')
  .get(userList)
  .post(saveShippingAddress)
router.route('/admin/usersDetails/:id').get( userDetails)

router.route('/wishlist').get( wishlistData)

router
  .route('/wishlist/:id')
  .post(addToWishlist)
  .put(removeFromWishlist)

module.exports = router
