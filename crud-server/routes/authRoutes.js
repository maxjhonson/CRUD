const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { getUserOAuth } = require("../controllers/authController");

const router = express.Router();

const successLoginUrl = "http://localhost:3000/LoginSucess";
const errorLoginUrl = "";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { scope: ["profile"], session: false }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token);
    res.redirect(successLoginUrl);
  }
);

router.get("/profile", getUserOAuth);

module.exports = router;
