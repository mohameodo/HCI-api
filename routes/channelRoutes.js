const express = require("express");
const authController = require("../controllers/authController");
const channelController = require("../controllers/channelController");
const playlistRouter = require("./../routes/playListRoutes");
const videoRouter = require("./../routes/videoRoutes");

const router = express.Router();

router.get("/", authController.isLoggedIn, channelController.getAllChannels);
router.use("/:channelId/playlists", playlistRouter);
router.use("/:channelId/videos", videoRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/login-with-google", authController.googleLogin);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyResetPass", authController.verifyResetPass);
router.patch("/resetPassword/:token", authController.resetPassword);

router.post(
  "/logoutAll",
  authController.validateRefreshToken,
  authController.logoutAll
);
router.post(
  "/refresh-access-token",
  authController.validateRefreshToken,
  authController.refreshAccessToken
);
router.post("/verify", authController.verifyChannel);
router.post("/get-otp", authController.sendMailVerify);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", channelController.getMe, channelController.getChannel);
router.patch("/updateMe", channelController.updateMe);
router.delete("/deleteMe", channelController.deleteMe);
router.patch(
  "/ban-channel",
  authController.protect,
  authController.restrictTo("admin"),
  channelController.banChannel
);

module.exports = router;
