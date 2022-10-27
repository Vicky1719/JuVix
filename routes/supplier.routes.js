const router = require("express").Router();
const Supplier = require("../models/Supplier.model");

//CREATE
//GET "/supplier/create"
router.get("/create", (req, res, next) => {
  res.render("supplier/create.hbs");
});

// POST "/supplier/create"
router.post("/create", async (req, res, next) => {
  try {
    await Supplier.create({
      name: req.body.name,
      location: req.body.location,
      administrador: req.session.activeUser._id,
    });

    res.redirect("/supplier");
  } catch (error) {
    next(error);
  }
});

// READ
//GET "/supplier" -> listar los suppliers de la BD
router.get("/", async (req, res, next) => {
  try {
    const supplierList = await Supplier.find();
    res.render("supplier/list.hbs", {
      supplierList,
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE
// GET "/supplier/:supplierId/edit" -> renderizar un formulario
router.get("/:supplierId/edit", (req, res, next) => {
  const { supplierId } = req.params;

  Supplier.findById(supplierId)
    .then((response) => {
      res.render("supplier/edit-supplier.hbs", {
        supplierDetails: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// POST "/supplier/:supplierId/edit" -> recibir los valores, actualizar suppliers
router.post("/:supplierId/edit", (req, res, next) => {
  const { supplierId } = req.params;

  const supplierUpdate = {
    name: req.body.name,
    location: req.body.location,
    administrador: req.session.activeUser._id,
  };

  Supplier.findByIdAndUpdate(supplierId, supplierUpdate)
    .then(() => {
      res.redirect("/supplier");
    })
    .catch((error) => {
      next(error);
    });
});

//POST "/supplier/:supplierId/delete"
router.post("/:supplierId/delete", (req, res, next) => {
  Supplier.findByIdAndDelete(req.params.supplierId)
    .then(() => {
      res.redirect("/supplier");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
