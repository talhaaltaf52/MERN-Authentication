const router = require("express").Router();
const subscribeCtrl = require("../controllers/subscribeCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post(
  "/add-subscription",
  auth,
  authAdmin,
  subscribeCtrl.addSubscription
);
router.get("/get-subscription", subscribeCtrl.getSubscription);
router.patch(
  "/update-subscription/:id",
  auth,
  authAdmin,
  subscribeCtrl.updateSubscription
);
router.delete(
  "/delete-subscription/:id",
  auth,
  authAdmin,
  subscribeCtrl.deleteSubscription
);
router.post("/add-user", auth, subscribeCtrl.addUser);
router.get(
  "/get-user-subscriptions",
  auth,
  authAdmin,
  subscribeCtrl.getUserSubscriptions
);

router.delete(
  "/delete-user-subscription/:id",
  auth,
  authAdmin,
  subscribeCtrl.deleteUserSubscription
);

module.exports = router;
