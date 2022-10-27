const router = require("express").Router();
const User = require("../models/User.model");

const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
const Product = require("../models/Product.model");

//GET "/profile/my-profile" => renderizar la vista del perfil
router.get("/my-profile", isLoggedIn, (req, res, next) => {
  User.findById(req.session.activeUser._id)

    .then((response) => {
      res.render("profile/my-profile.hbs", {
        userDetails: response,
      });
    })
    .catch((err) => {
      next(err);
    });
});

//GET "/product/favorites"
router.get("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const favoriteList = (
      await User.findById(req.session.activeUser._id).populate("favorites")
    ).favorites;
    res.render("profile/favorites.hbs", {
      favoriteList,
    });
  } catch (error) {
    next(error);
  }
});

//POST "/product/favorites"
router.post("/favorites/:favoriteId", isLoggedIn, async (req, res, next) => {
  const { favoriteId } = req.params;
  try {
    if (( await User.findById(req.session.activeUser._id).populate("favorites")).favorites.some((favorite) => favorite._id == favoriteId)) 
    {
      const productoFavorito = await User.findByIdAndUpdate(
        req.session.activeUser._id,
        { $push: { favorites: favoriteId } }
      );
    }
    res.redirect("/profile/favorites");
  } catch (error) {
    next(error);
  }
});

//DELETE "/product/favorites"
router.post(
  "/favorites/:favoriteId/delete",
  isLoggedIn,
  async (req, res, next) => {
    const { favoriteId } = req.params;
    try {
      const productoFavorito = await User.findByIdAndUpdate(
        req.session.activeUser._id,
        { $pull: { favorites: favoriteId } }
      );

      res.redirect("/profile/favorites");
    } catch (error) {
      next(error);
    }
  }
);

//GET "/profile/:userId/edit
router.get("/:userId/edit", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((response) => {
      res.render("profile/edit-profile.hbs", {
        details: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//POST "profile/:userId/edit"
router.post("/:userId/edit", (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email, username, password } = req.body;

  const userUpdate = {
    firstName,
    lastName,
    email,
    username,
    password,
  };

  User.findByIdAndUpdate(userId, userUpdate)
    .then(() => {
      res.redirect("/profile/my-profile");
    })
    .catch((error) => {
      next(error);
    });
});

//POST "/profile/:userId/delete"
router.post("/:userId/delete", (req, res, next) => {
  User.findByIdAndDelete(req.params.userId)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
});
// router.get("/admin", isLoggedIn, (req, res, next) => {
//      res.render("profile/admin.hbs")
//  })

module.exports = router;
