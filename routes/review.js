const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewisAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//REVIEWS
//Post REVIEW Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//DELETE REVIEW Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewisAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
