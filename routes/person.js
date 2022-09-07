const express = require("express");
const router = express.Router();

const { create, list, read, update, remove } = require("../controllers/person");

// middleware
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploadfile");

// localhost:8000/api/persons
router.get("/person", auth, list);
router.get("/person/:id", auth, read);
router.post("/person", auth, upload, create);
router.put("/person/:id", auth, update);
router.delete("/person/:id", auth, remove);

module.exports = router;
