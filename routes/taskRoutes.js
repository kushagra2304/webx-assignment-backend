const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

router.use(auth);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
