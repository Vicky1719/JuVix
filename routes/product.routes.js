const router = require("express").Router();
const { get } = require("mongoose");
const Product = require("../models/Product.model");
const Supplier = require("../models/Supplier.model");

//CREATE
// GET para agregar producto

router.get("/create", async (req, res, next) => {
  try {
    const vendedorList = await Supplier.find().select("name")
    res.render("product/create.hbs", {
      vendedorList
    });
  } catch (error) {
    next(error);
  }
});

//POST recibir información del nuevo producto
router.post("/create", (req, res, next) => {

 // const vendedorList = Supplier.find().select("name")
  let productAdd = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    supplier: req.body.supplier,
    administrador: req.session.activeUser._id 
  }

  Product.create(productAdd)
  .then((response)=> {
    console.log("producto añadido")
    res.redirect("/")
  })
  .catch((error) => {
    next(error)
  })
});

//GET "/products" => ruta para que el usuario vea la lista de productos según categoría:maquillaje
router.get("/:productCategory", (req, res, next) => {

    let{productCategory} = req.params

    Product.find({category:productCategory})
    .then((response) => {
        res.render("product/list.hbs", {
            categoria: response
        })
    })
    .catch((error) => {
        next(error)
    })

})

//UPDATE
// //GET "/product/:productCategory/edit"
// router.get("/product")

module.exports = router;