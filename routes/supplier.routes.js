const router = require("express").Router();
const Supplier = require("../models/Supplier.model");



router.get("/create", (req, res, next) => {
    res.render("supplier/create.hbs")
})

//POST "/supplier/create"
router.post("/create", async (req, res, next) => {
    const{name, location} = req.body
    try{
        await Supplier.create({
            name,
            location
        })

        res.redirect("/")
    }catch(error) {
        next(error)
    }})


    //GET hacer lista de vendedores
    router.get("/", async (req, res, next) => {
        try {
            const supplierList= await Supplier.find()
            res.render("supplier/list.hbs", {
                supplierList
            })
        }catch (error) {
            next(error)
        }
    })

module.exports = router;