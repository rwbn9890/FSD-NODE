const express = require("express")

const route = express.Router();

const cartController = require("../controllers/cartController")

route.get("/", cartController.cart)

route.post("/insertCart", cartController.addCart)

module.exports = route