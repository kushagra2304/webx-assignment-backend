const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", auth, userController.getProfile);
router.get("/", auth, role(["admin"]), userController.getAllUsers);

module.exports = router;
