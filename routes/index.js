const express = require("express")
const db = require("../config/db")
const route = require("./cart")

const routes = express.Router()

const productController = require("../controllers/productController")


routes.post("/insertData",productController.insertData)


routes.get("/", productController.index )

routes.get("/about", productController.about)

routes.get("/contact", productController.contact )

routes.use("/cart", require("./cart") )



module.exports = routes