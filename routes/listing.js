const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ejsMate = require("ejs-mate");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,wrapAsync(listingController.destroyListing));

 

//Edit Route

router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);


//DELETE ROUTE

// router.delete(
//   "/:id",
//   isLoggedIn,
//   wrapAsync(listingController.destroyListing)
// );

module.exports = router;
