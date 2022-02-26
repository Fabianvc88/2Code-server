const express = require("express");
const router = express.Router();

const config = require("../config/server-config");

const problems = require("./problems");
const authentication = require("./authentication");

/*const {
  app: { secret },
} = config;

var jwt = require("express-jwt");
var auth = jwt({
  secret: secret,
  userProperty: "payload", // the default name is user, changed to payload to avoid ambiguousness
  algorithms: ["HS256"],
});*/

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get("/", function (req, res) {
  res.json({ message: "Welcome to 2Code api!" });
});

// authentication, url: /api/authentication/login
/*router.use("/authentication", authentication);
// question, url: /api/admin/question
router.use("/admin/question", auth, question);
// user, url: /api/admin/user
router.use("/admin/user", auth, user);
// database, url: /api/admin/database
router.use("/admin/database", database);
// submission, url: /api/submission
router.use("/submission", submission);*/

router.use("/authentication", authentication);
//router.use("/problems", problems);

module.exports = router;
