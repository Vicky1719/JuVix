const router = require("express").Router();
const Supplier = require("../models/Supplier.model");

//GET "/supplier/create" 
router.get("/create", (req, res, next)=> {
    res.render("supplier/create.hbs")
})

// POST "/supplier/create"
router.post("/create", async (req, res, next) => {
    const{ name, location} = req.body
try{
    await Supplier.create({
        name,
        location
    })

    res.redirect("/supplier")
} catch(error){
    next (error)
}
})



module.exports = router;