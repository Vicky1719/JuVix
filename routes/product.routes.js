const router = require("express").Router();
const { get } = require("mongoose");
const Product = require("../models/Product.model");
const Supplier = require("../models/Supplier.model");
const User = require("../models/User.model");
// const uploader = require("../middlewares/cloudinary.js")

//GET "/product/search" 
router.get("/search", (req, res, next) => {
  const { searchProduct } = req.query

  if (searchProduct === undefined) {
    res.render("product/search.hbs")
  } else {
    Product.findOne({ name: searchProduct })
      .then((response) => {
        console.log(response)
        res.render("product/search.hbs", {
          details: response
        })
      })
      .catch((error) => {
        next(error)
      })
  }
})


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
  // , uploader.single("image")

  // const vendedorList = Supplier.find().select("name")
  let productAdd = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    supplier: req.body.supplier,
    administrador: req.session.activeUser._id,
    // image: req.file.path
  }

  Product.create(productAdd)
    .then((response) => {
      console.log("producto añadido")
      res.redirect("/product")
    })
    .catch((error) => {
      next(error)
    })
});

//GET "/products" => ruta para que el usuario vea la lista de productos según categoría:maquillaje
router.get("/:productCategory", (req, res, next) => {

  let { productCategory } = req.params

  Product.find({ category: productCategory })
    .then((response) => {
      res.render("product/category-list.hbs", {
        categoria: response
      })
    })
    .catch((error) => {
      next(error)
    })

})

// READ
//GET "/product" -> listar los productos de la BD
router.get("/", async (req, res, next) => {

  try {
    const productList = await Product.find().select("name")
    res.render("product/list.hbs", {
      productList
    })
  } catch (error) {
    next(error)
  }
})



//UPDATE
//GET "/product/:productId/edit
router.get("/:productId/edit", async (req, res, next) => {
  const { productId } = req.params

  try {
    const detallesProducto = await Product.findById(productId)
    const vendedorList = await Supplier.find()
    res.render("product/edit-product.hbs", {
      vendedorList,
      detallesProducto
    })



  } catch (error) {
    next(error)
  }
})

//POST "product/:productId/edit"
router.post("/:productId/edit", (req, res, next) => {
  const { productId } = req.params
  // const { name, description, category, supplier } = req.body

  const productUpdate = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    supplier: req.body.supplier,
    administrador: req.session.activeUser._id
  }

  Product.findByIdAndUpdate(productId, productUpdate)
    .then(() => {
      res.redirect("/product")
    })
    .catch((error) => {
      next(error)
    })
})

//POST "/product/:productId/delete"
router.post("/:productId/delete", (req, res, next) => {
  Product.findByIdAndDelete(req.params.productId)
    .then(() => {
      res.redirect("/product")
    })
    .catch((error) => {
      next(error)
    })
})






// //GET "/product/favorites"
// router.get("/favorites",async (req, res, next) => {

//   try{
//     const favoriteList = await Product.find()
//     .populate("favorites")
//     console.log(favoriteList)
//     res.render("profile/favorites.hbs", {
//       favoriteList

//     })
//   }catch (error){
//     next(error)
//   }

// })

// //POST "/product/favorites"
// router.post("/favorites", async (req, res, next) => {

//   try{
//     User.findByIdAndUpdate(session.activeUser._id)
//     res.redirect("profile/favorites.hbs")

//     }
//   catch (error){
//     next(error)
//   }
// })

module.exports = router;