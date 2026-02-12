const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get("/profile", auth, userController.getProfile);
router.get("/", auth, role(["admin"]), userController.getAllUsers);
router.put(
  "/profile-image",
  auth,
  upload.single("profileImage"),
  userController.uploadProfileImage
);
router.delete("/profile-image", auth, userController.removeProfileImage);

module.exports = router;
