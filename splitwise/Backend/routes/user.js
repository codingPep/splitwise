const express = require("express");

const router = express.Router();

const userController = require("../controllers/userControllers");

router.post("/signin", userController.fetch);
router.post("/signup", userController.signup);
router.post("/googlesignin", userController.google);
router.post("/update", userController.update);
router.post("/balance", userController.balance);

module.exports = router;
