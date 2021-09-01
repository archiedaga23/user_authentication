const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../config/key').secretKey;
const router = express.Router();
const registerValidation = require('../validation/register');

router.post('/register', (req, res) => {
  
   const {errors, isValid} = registerValidation(req.body);

   if (!isValid) {
     return res.status(400).json(errors);
   }

   User.findOne({username: req.body.username})
     .then(user => {
       if (user) {
         return res.status(400).json({message: 'Username already exist...'});
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

  User.findOne({username: req.body.username})
    .then(user => {
      if (!user) {

        return res.status(404).json({message: 'Username not found...'});
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
              return res.status(400).json({ message: 'Incorrect Password...' });
          }
        })
        .catch(err => {
          return res.status(400).json({ message: 'Incorrect Password...' });
        })
    })
    .catch(err => res.status(500).json({error: 'User not found...'}));
})

module.exports = router;