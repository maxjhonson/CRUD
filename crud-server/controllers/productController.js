const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

exports.fetchProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  return res.status(200).json({
    status: "success",
    data: {
      products: products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = {
    name: req.body.product,
    price: req.body.price,
  };
  const newProduct = await Product.create(product);
  return res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.productManagement = catchAsync(async (req, res, next) => {
  const product = {
    name: req.body.product,
    //we do no modify price here
  };
  const updatedProduct = Product.findByIdAndUpdate(req.body._id, product);
  return res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

exports.priceManagement = catchAsync(async (req, res, next) => {
  const product = {
    name: req.body.product,
    price: req.body.price,
  };
  const updatedProduct = Product.findByIdAndUpdate(req.body._id, product);
  return res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.deleteOne({ _id: req.params.id });
  return res.status(200).send();
});
