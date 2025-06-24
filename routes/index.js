const express = require("express")
const db = require("../config/db")

const routes = express.Router()

const productController = require("../controllers/productController")


routes.post("/insertData",productController.insertData)


routes.get("/", productController.index )

routes.get("/about", productController.about)

routes.get("/contact", productController.contact )



module.exports = routes