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

//GET "/profile/:userId/edit
router.get("/:userId/edit", (req, res, next) => {
    const {userId} = req.params

    User.findById(userId)
    .then((response) => {
        res.render("profile/edit-profile.hbs", {
            details:response
        })
    })
    .catch((error) => {
        next(error)
    })
})

//POST "profile/:userId/edit"
router.post("/:userId/edit", (req,res, next) => {
    const {userId} = req.params
    const {firstName, lastName, email, username, password} = req.body

    const userUpdate = {
        firstName, 
        lastName, 
        email, 
        username, 
        password
    }

    User.findByIdAndUpdate(userId, userUpdate)
    .then(()=> {
        res.redirect("/profile/my-profile")
    })
    .catch((error) => {
        next(error)
    })
})

//POST "/profile/:userId/delete"
router.post("/:userId/delete", (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .then(()=> {
        res.redirect("/")
    })
    .catch((error)=> {
        next(error)
    })
})
// router.get("/admin", isLoggedIn, (req, res, next) => {
//      res.render("profile/admin.hbs")
//  })



// //GET "/product/favorites"
// router.get("/favorites", isLoggedIn, async (req, res, next) => {

//     try{
//       const favoriteList = await User.find()
//       .populate("favorites")
//       console.log(favoriteList)
//       res.render("profile/favorites.hbs", {
//         favoriteList
  
//       })
//     }catch (error){
//       next(error)
//     }
  
//   })
  
//   //POST "/product/favorites"
//   router.post("/favorites", isLoggedIn, async (req, res, next) => {

//     try{

//      const productoFavorito = await User.findByIdAndUpdate(session.activeUser._id)
//       res.redirect("profile/favorites.hbs")
  
//       }
//     catch (error){
//       next(error)
//     }
//   })

module.exports = router;
