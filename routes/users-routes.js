const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
const getUsers = require("../controllers/users-controllers");

router.get("/", getUsers.getUsers);
router.get("/:pid", getUsers.getUserById);
router.post(
  "/",
  [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail(), check("password").isLength({min: 6})],
  getUsers.addUsers
);
router.patch(
  "/:pid",
  [check("name").not().isEmpty(), check("email").normalizeEmail()],
  getUsers.updatUsers
);
router.delete("/:pid", getUsers.deleteUser);

module.exports = router;
