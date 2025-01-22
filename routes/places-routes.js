const express = require("express");
const router = express.Router();
const getPlace = require("../controllers/places-controllers");
const { check } = require("express-validator");

router.get("/all", getPlace.getAllPlaces);
router.get("/:pid", getPlace.getPlaceById);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("address").isLength({ min: 5 }),
  ],
  getPlace.createPlace
);
router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("address").isLength({ min: 5 }),
  ],
  getPlace.updatePlace
);
router.delete("/:pid", getPlace.deletePlace);

module.exports = router;
