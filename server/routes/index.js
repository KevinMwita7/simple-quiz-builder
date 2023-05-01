const express = require('express');
const router = express.Router();
const debug = require("debug")("quizzer:index");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { signUpValidationSchema, signInValidationSchema, validateRequest } = require("../utils/validation-schemas");
const User = require('../models/user');
var sequelize = require('../utils/sequalize-connection');

/* POST user sign-up */
router.post('/sign-up', validateRequest(signUpValidationSchema) , async (req, res, next) => {
  try {
    debug(req.session.user);
    debug(req.body);
    const userId = uuidv4();
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({ id: userId, email: req.body.email, password: hash });
    
    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);

      // store user information in session, typically a user id
      req.session.user = userId;

      req.session.save(function (err) {
        if (err) return next(err)
        res.send("OK");
      })
    })

  } catch(e) {
    // Handle SQL error
    if(e.sql) {
      let errors = {};

      e.errors.forEach(error => {
        errors[error.path] = `${error.message[0].toUpperCase()}${error.message.substring(1)}`
      });

      return res.status(400).json(errors);
    }

    return res.status(500).send("Internal Server Error");
  }
})

/* POST user sign-in */
router.post('/sign-in', validateRequest(signInValidationSchema) , async (req, res, next) => {
  try {
    debug(req.session.user);
    debug(req.body);
    
    const user = await User.findOne({ where: { email: req.body.email } });
    
    if(user) {
      const correctPassword = await bcrypt.compare(req.body.password, user.getDataValue("password"));
      
      if(!correctPassword) {
        return res.status(400).json({ "password": "Wrong password. Please try again" }); 
      }
      
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err);

        // store user information in session, typically a user id
        req.session.user = user.getDataValue("id");

        req.session.save(function (err) {
          if (err) return next(err)
          res.send("OK");
        })
      })      
    } else {
      return res.status(400).json({ "email": "Couldn't find your email" });
    }
  } catch(e) {
    return res.status(500).send("Internal Server Error");
  }
})

module.exports = router;