const express = require('express')
const {
  addonCreate,
  addonList,
  addonBySlug,
  addonUpdate,
  addonDelete,
} = require('../controllers/addonControllers')

const router = express.Router()

router.route('/addon').post(addonCreate).get(addonList)
router
  .route('/addon/:slug')
  .get(addonBySlug)
  .put(addonUpdate)
  .delete(addonDelete)

module.exports = router
