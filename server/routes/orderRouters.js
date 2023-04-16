const express = require('express')
const {
  orderCreate,
  getOrderById,
  userOrderList,
  adminOrderList,
  updateOrderStatus,
  updatePaymentStatus,
} = require('../controllers/orderControllers')

const router = express.Router()

router.route('/order').post( orderCreate).get( userOrderList)
router.route('/order/:id').get(getOrderById)
router.route('/admin/orderlist').get(adminOrderList)
router
  .route('/admin/orderStatus/:id')
  .put(updateOrderStatus)

router
  .route('/admin/paymentStatus/:id')
  .put(updatePaymentStatus)

module.exports = router
