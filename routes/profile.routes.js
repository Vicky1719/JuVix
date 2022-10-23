const router = require("express").Router();
const User = require("../models/User.model");

 
 const {isLoggedIn} = require("../middlewares/auth.middlewares.js");


//GET "/profile/my-profile" => renderizar la vista del perfil
router.get("/my-profile", isLoggedIn, (req, res, next) => {
    User.findById(req.session.activeUser._id)
    
    .then((response) => {
        res.render("profile/my-profile.hbs", {   
    userDetails: response
        })
    }).catch((err) => {
        next(err)
    })
    

})
// router.get("/admin", isLoggedIn, (req, res, next) => {
//      res.render("profile/admin.hbs")
//  })



module.exports = router;