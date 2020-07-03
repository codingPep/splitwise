const express = require("express");

const router = express.Router();

const friendsController = require("../controllers/friendsController");

router.post("/fetch", friendsController.fetch);

router.post("/option", friendsController.option);

router.post("/add", friendsController.add);

module.exports = router;
