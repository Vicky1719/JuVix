const router = require("express").Router();
const { get } = require("mongoose");
const Product = require("../models/Product.model");
const Supplier = require("../models/Supplier.model");

// GET para agregar producto

router.get("/create", async (req, res, next) => {
  try {
    const productList = await Product.find();
    res.render("product/create.hbs", {
      productList,
    });
  } catch (error) {
    next(error);
  }
});
//POST recibir información del nuevo producto
router.post("/create", (req, res, next) => {
  let productAdd = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    supplier: req.body.supplier,
    administrador: req.body.administrador,
  };
});

//GET "/products" => ruta para que el usuario vea la lista de productos según categoría:maquillaje
router.get("/:category", (req, res, next) => {

    let{category} = req.params

    Product.findbyId(category)
    .populate("maquillaje")
    .then((response) => {
        res.render("product/list.hbs", {
            productCategory: response
        })
    })
    .catch((error) => {
        next(error)
    })

})


module.exports = router;