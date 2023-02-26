const router = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const uploadImage = require("../middleware/uploadImage");
const auth = require("../middleware/auth");

router.post("/upload", uploadImage, auth, uploadCtrl.uploadAvatar);

module.exports = router;
