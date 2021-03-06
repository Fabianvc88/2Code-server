//var passport = require("passport");
//var mongoose = require("mongoose");
//var moment = require("moment");
//const { DateTime } = require("luxon");
//var User = mongoose.model("User");
const { PrismaClient } = require("@prisma/client");
const { validationResult } = require("express-validator");
const ValidationError = require("../models/validationerror");
//const TokenUtil = require("../utils/").TokenUtil;
//const SleepUtil = require("../utils/").SleepUtil;

const prisma = new PrismaClient();

/*var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};*/

module.exports.signup = async function (req, res) {
  //SleepUtil.sleep();
  // get the validation result which is defined in router
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return if validation fails
    return res.status(422).json({ errors: errors.array() });
  }

  user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    var error = new ValidationError(
      "body",
      "email",
      req.body.email,
      "El email ya existe!"
    );
    res.status(422).json({ errors: [error] });
  } else {
    let user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      var error = new ValidationError(
        "body",
        "username",
        req.body.username,
        "El nombre de usuario ya existe!"
      );
      res.status(422).json({ errors: [error] });
    } else {
      let newUser;
      try {
        newUser = await prisma.user.create({
          data: {
            email: req.body.email,
            username: req.body.username,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
          },
        });
      } catch (e) {
        console.error(e);
        res.status(422).json({ errors: [e] });
        throw e;
      }
      res.status(200).json(newUser);
    }
  }
};

module.exports.login = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return if validation fails
    return res.status(422).json({ errors: errors.array() });
  }

  user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  // if no user found, meaning validation fails
  if (!user) {
    var error = new ValidationError(
      "body",
      "email",
      req.body.email,
      "El email no esta registrado"
    );
    return res.status(422).json({ errors: [error] });
  } else {
    /*var token = user.generateJwt();
    if (req.body.remember == true) {
      console.log("remember me, save cookie");
      res.cookie("cookieToken", token, { maxAge: 900000 }); //expires after 900000 ms = 15 minutes
    }*/
    res.status(200);
    res.json({
      //token: token,
      email: req.body.email,
      logged: "yes",
    });
  }
};

/*module.exports.autologin = function(req, res) {
  SleepUtil.sleep();
  // check if the user's credentials are saved in a cookie //
  console.log("autologin");
  console.log(req.cookies);
  const token = req.cookies.cookieToken;
  console.log(token);
  if (token) {
    const userDetails = TokenUtil.decodeToken(token);
    console.log(userDetails);
    if (userDetails) {
      User.findOne({ username: userDetails.username }, function(err, user) {
        if (err) {
          res.status(200).send(err);
        }
        // Return if user not found in database
        if (!user) {
          res.status(200).send("User not found");
        }
        // Return if password is wrong
        if (user.hash != userDetails.hash) {
          res.status(200).send("Password is invalid");
        }
        // If credentials are correct, return the user object
        // If a user is found
        if (user) {
          var token = user.generateJwt();
          res.status(200);
          res.json({
            token: token
          });
        }
      });
    } else {
      res.status(200).send();
    }
  } else {
    res.status(401).send();
  }
};*/

module.exports.logout = function (req, res) {
  SleepUtil.sleep();
  console.log(req.cookies);
  res.clearCookie("cookieToken");
  console.log(req.cookies);

  res.status(200).send();
};

/*module.exports.update = function (req, res) {
  SleepUtil.sleep();
  // get the validation result which is defined in router
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return if validation fails
    return res.status(422).json({ errors: errors.array() });
  }

  var upduser = new User({
    _id: req.body._id,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  });

  User.findById(upduser._id, function (err, user) {
    if (!user) {
      var error = new ValidationError(
        "body",
        "username",
        upduser.username,
        "User doesn't exist!"
      );
      res.status(422).json({ errors: [error] });
    } else {
      /*
      // Return if password is wrong
      if (!user.validPassword(upduser.password)) {
        var error = new ValidationError(
          "body",
          "password",
          upduser.password,
          "Password is not match"
        );
        res.status(422).json({ errors: [error] });
      }*/
//
/*User.findOne({ username: upduser.username }, function (err, user2) {
        if (user2 && !user2._id.equals(upduser._id)) {
          var error = new ValidationError(
            "body",
            "username",
            upduser.username,
            "Username is existed!"
          );
          res.status(422).json({ errors: [error] });
        } else {
          User.findOne({ email: upduser.email }, function (err, user3) {
            if (user3 && !user3._id.equals(upduser._id)) {
              var error = new ValidationError(
                "body",
                "email",
                upduser.email,
                "Email is existed!"
              );
              res.status(422).json({ errors: [error] });
            } else {
              //update username and email
              user.username = upduser.username;
              user.email = upduser.email;
              user.role = upduser.role;
              //console.log(user);
              user.save(function (err) {
                var token;
                token = user.generateJwt();
                res.status(200);
                res.cookie("token", token, { maxAge: 60000 }); //expires after 60000 ms = 1 minute
                res.json({
                  token: token,
                });
              });
            }
          });
        }
      });
    }
  });
};*/

/*module.exports.resetpwd = function (req, res) {
  SleepUtil.sleep();
  // get the validation result which is defined in router
  console.log("resetpwd");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return if validation fails
    console.log("haserror");
    console.log(errors);
    return res.status(422).json({ errors: errors.array() });
  }

  const username = req.body.username;
  const password = req.body.password;

  console.log("before passport.authenticate");
  // check with passport
  passport.authenticate("local", function (err, user, info) {
    console.log("after passport.authenticate");
    // If Passport throws/catches an error
    if (err) {
      var error = new ValidationError("body", "password", password, err);
      res.status(422).json({ errors: [error] });
      return;
    }
    // if no user found, meaning validation fails
    if (!user) {
      var error = new ValidationError("body", "username", username, info);
      return res.status(422).json({ errors: [error] });
    }

    // If a user is found
    if (user) {
      // set hash and salt
      user.setPassword(req.body.newpwd);

      console.log(user);
      user.save(function (err) {
        if (err) {
          var error = new ValidationError("body", "password", password, err);
          return res.status(422).json({ errors: [error] });
        }
        var token;
        token = user.generateJwt();
        res.status(200);
        res.cookie("token", token, { maxAge: 60000 }); //expires after 60000 ms = 1 minute
        res.json({
          token: token,
        });
      });
    }
  })(req, res);
};*/
