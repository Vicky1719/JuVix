const router = require("express").Router();
const { get } = require("mongoose");
const Product = require("../models/Product.model");
const Supplier = require("../models/Supplier.model");

// GET para agregar producto


router.get("/create", (req, res,next) => {
    res.render("product/create.hbs")
})

// POST recibir información del nuevo producto
router.post("/create", async (req, res, next) => {
    const { name, description, category, supplier } = req.body
    try {
        await Product.create({
            name,
            description,
            category,
            supplier
        })
//     const newProduct = {
//     name: name,
//     description: description,
//     category: category,
//     supplier: supplier,
// }

// await Product.create(newProduct)
res.redirect("/")
}catch (err) {
    next(err)
}
})

// lista





// router.get("/create", async (req, res, next) => {
//   try {
//     const productList = await Product.find();
//     res.render("product/create.hbs", {
//       productList,
//     });
//   } catch (error) {
//     next(error);
//   }
// });


// router.post("/create", (req, res, next) => {


//   let productAdd = {
//     name: req.body.name,
//     description: req.body.description,
//     category: req.body.category,
//     supplier: req.body.supplier,

//   };


  
//   Product.create(productAdd)
//   .then((response)=> {
//     res.redirect("/")
//   })
//   .catch((error) => {
//     next(error)
//   })
// });

///GET "/products" => ruta para que el usuario vea la lista de productos según categoría:maquillaje
router.get("/:category", (req, res, next) => {

    let{category} = req.params
    
    Product.find({category:["maquillaje", "ropa", "cuidado de la piel", "estilo de vida"]})
    .then((response) => {
        res.render("product/list.hbs", {
            productCategory: response
        })
    })
    .catch((error) => {
        next(error)
    })

})

router.get("/product/search", (req, res, next) => {
const {searchproduct} = req.query
if (searchproduct === undefined) {
    res.render("product/search.hbs")
}else {
    Product.findOne({name: searchproduct})
    .then((response) => {
        res.render("product/search.hbs", {
            productSearch: response
        })
        
    })
    .catch ((error)  => {
next
    })
}

})


router.get("/:productById/search", (req, res, next) => {
let {productById} =req.params
Product.findById(productById)
.then((response) => {
    res.render("product/search.hbs", { 
        productSearch: response
    })

})
.catch((error) => {
    next(error)
})
})

module.exports = router;
