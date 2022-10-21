const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// rutas
const productRoutes = require("./product.routes.js")
router.use("/product", productRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

const supplierRoutes = require("./supplier.routes.js")
router.use("/supplier", supplierRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)


module.exports = router;
