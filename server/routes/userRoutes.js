const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = require("express").Router();

router.post("/register", userCtrl.register);
router.post("/verify-email", userCtrl.activateEmail);
router.post("/login", userCtrl.login);
// router.post("/refresh_token", auth, userCtrl.getAccessToken);
router.post("/forgot-password", userCtrl.forgotPassword);
router.post("/reset-password", auth, userCtrl.resetPassword);
router.get("/profile", auth, userCtrl.getUserInfo);
router.get("/all-profiles", auth, authAdmin, userCtrl.getUsersAllInfo);
router.get("/logout", userCtrl.logout);
router.patch("/update-profile", auth, userCtrl.updateUser);
router.patch("/update-user-role/:id", auth, authAdmin, userCtrl.updateUserRole);
router.delete("/delete-profile/:id", auth, authAdmin, userCtrl.deleteUser);
router.post("/create-role", auth, authAdmin, userCtrl.createRole);
router.get("/get-roles", auth, authAdmin, userCtrl.getAllRoles);
router.delete("/delete-role/:id", auth, authAdmin, userCtrl.deleteRole);


module.exports = router;
