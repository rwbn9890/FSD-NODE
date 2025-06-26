const express = require("express");

const routes = express.Router();

routes.use(express.urlencoded())

const adminController = require("../controllers/adminController")

routes.get("/", adminController.home)

routes.get("/admin_table", adminController.adminTable)

routes.get("/admin_form", adminController.adminForm)

routes.post("/insertAdmin", adminController.insertAdmin)

module.exports = routes