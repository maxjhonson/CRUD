const express = require("express");
const authController = require("../controllers/authController");
const {
  createProduct,
  productManagement,
  priceManagement,
  fetchProducts,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("PRODUCT_MANAGERS"),
    deleteProduct
  );

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("PRODUCT_CREATORS"),
    createProduct
  )
  .get(authController.protect, fetchProducts);

router
  .route("/management")
  .put(
    authController.protect,
    authController.restrictTo("PRODUCT_MANAGERS "),
    productManagement
  );

router
  .route("/price")
  .put(
    authController.protect,
    authController.restrictTo("PRODUCT_PRICING  "),
    priceManagement
  );
module.exports = router;
