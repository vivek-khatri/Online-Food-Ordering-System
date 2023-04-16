const express = require('express')
const {
  couponCreate,
  couponList,
  couponDelete,
} = require('../controllers/couponControllers')



const router = express.Router()

router
  .route('/coupon')
  .post(couponCreate)
  .get(couponList)
router.route('/coupon/:id').delete( couponDelete)

module.exports = router
