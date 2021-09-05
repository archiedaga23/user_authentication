const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../config/key').secretKey;
const router = express.Router();
const registerValidation = require('../validation/register');
const loginValidation = require('../validation/login');
const { log } = require('npmlog');
const login = require('../validation/login');

router.post('/register', (req, res) => {
  
   const { errors, isValid } = registerValidation(req.body);

   if (!isValid) {
     return res.status(400).json(errors);
   }

   User.findOne({username: req.body.username})
     .then(user => {
       if (user) {
         errors.username = 'Username already exist...';
         return res.status(400).json(errors);
       }
       bcrypt.hash(req.body.password, 10)
         .then((hash) => {
           const user = new User({
             username:  req.body.username,
             firstname: req.body.firstname,
             password:  hash,
             lastname:  req.body.lastname,
           })
           user
            .save()
            .then(user => {
              return res.status(201).json(user);
            })
         })
      })
      .catch(err => res.status(404).json(err));
})

router.post('/login', (req, res) => {

  const { errors, isValid } = loginValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({username: req.body.username})
    .then(user => {
      if (!user) {
        errors.username = "Username not found...";
        return res.status(404).json(errors);
      }

      bcrypt.compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            const payload = {
              username: user.username,
              password: user.password,
              firstname: user.username,
              lastname: user.lastname
            }

            jwt.sign(payload, privateKey, { expiresIn: '1h'}, (err, token) => {
              return res.status(200).json({ token: 'Bearer ' + token });
            })
            
          }
          else {
              errors.password = 'Incorrect Password...';
              return res.status(400).json(errors);
          }
        })
        .catch(err => {
          errors.password = 'Incorrect Password...';
          return res.status(400).json(errors);
        })
    })
})

module.exports = router;