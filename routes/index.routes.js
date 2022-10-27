const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// rutas
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes");
router.use("/profile", profileRoutes);

const productRoutes = require("./product.routes");
router.use("/product", productRoutes);

const supplierRoutes = require("./supplier.routes");
router.use("/supplier", supplierRoutes);

module.exports = router;
