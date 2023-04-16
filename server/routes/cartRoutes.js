const express = require('express')
const {
  dbCart,
  cartList,
  clearDbCart,
  applyCoupon,
  cancelCoupon,
  deleteUserDbCart,
} = require('../controllers/cartControllers')



const router = express.Router()

router
  .route('/cart')
  .post(dbCart)
  .get(cartList)
  .delete(clearDbCart)
router.route('/cart/coupon').post(applyCoupon)
router.route('/cart/coupon-cancel').post(cancelCoupon)
router.route('/cart/delete-user-cart').delete( deleteUserDbCart)

module.exports = router
