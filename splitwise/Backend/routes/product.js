const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.post("/fetch", productController.fetch);

router.post("/details", productController.details);

router.post("/share", productController.share);

router.post("/add", productController.add);

router.post("/rent", productController.rent);

module.exports = router;
