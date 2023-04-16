const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const slugify = require('slugify')

// @desc    create product
// @route   POST /api/product
// @access  Private admin
exports.productCreate = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    image,
    category,
    variable,
    addon,
    sold,
    description,
    delivery,
    availability,
  } = req.body

  const productExist = await Product.findOne({ slug: slugify(title) })

  if (productExist) {
    res.status(500)
    throw new Error('Product with the same name already exist')
  } else {
    const product = await Product.create({
      user: req.user.name,
      title,
      slug: slugify(title),
      price,
      image,
      variable,
      category,
      addon,
      sold,
      description,
      delivery,
      availability,
    })
    if (product) {
      res.json(product)
    } else {
      res.status(401)
      throw new Error('Product create failed')
    }
  }
})

// @desc    get Products
// @route   GET /api/product
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const search = req.query.search
  if (search !== '' || null) {
    const products = await Product.find({
      title: { $regex: search, $options: 'i' },
    })
      .select('title slug image.url')
      .limit(12)
      .exec()
    res.json(products)
  } else {
    res.json([])
  }
})

// @desc    delete Products
// @route   DELETE /api/product/id
// @access  Private admin
exports.deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    // await cloudinary.v2.uploader.destroy(product.image.public_id)
    // await product.remove()
    res.json({
      message: 'Product Deleted',
    })
  } else {
    res.status(500)
    throw new Error('Product Not Found')
  }
})

// @desc    get Products by slug
// @route   GET /api/product
// @access  Public
exports.getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category', 'name slug')
    .populate('addon', 'name price slug')
    .populate({
      path: 'variable',
      populate: { path: 'attribute' },
    })
  if (product) {
    res.json(product)
  } else {
    res.status(500)
    throw new Error('Product Not Found')
  }
})

// @desc    update product by slug
// @route   PUT /api/product/:SLUG
// @access  Private admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
  const {
    title,
    price,
    variable,
    image,
    category,
    addonPrev: addon,
    sold,
    description,
    delivery,
    availability,
  } = req.body

  if (product) {
    product.title = title
    product.slug = slugify(title)
    product.price = price
    product.variable = variable
    product.image = image
    product.category = category
    product.addon = addon
    product.sold = sold
    product.description = description
    product.delivery = delivery
    product.availability = availability
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(500)
    throw new Error('Product Not Found')
  }
})

// @desc    Count Products
// @route   GET /api/productCount
// @access  Public
exports.countProducts = asyncHandler(async (req, res) => {
  const count = await Product.find({}).estimatedDocumentCount().exec()
  res.json(count)
})

// @desc    get Products Admin
// @route   GET /api/productListAdmin
// @access  Public
exports.getProductsAdmin = asyncHandler(async (req, res) => {
  const { page, sort, order } = req.body
  const currentPage = page || 1
  const perPage = 10

  const products = await Product.find({})
    .populate('category', 'name slug')
    .populate('addon', 'name price slug')
    .populate({
      path: 'variable',
      populate: { path: 'attribute' },
    })
    .skip((currentPage - 1) * perPage)
    .sort([[sort, order]])
    .limit(perPage)
    .exec()
  res.json(products)
})
