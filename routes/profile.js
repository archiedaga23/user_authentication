const express = require('express');
const passport = require('passport');

const User = require('../model/User');
const Profile = require('../model/Profile');
const uploader = require('../middleware/uploader');
const router = express.Router();
const { proxy } = require('../config/key');


router.post('/create-profile', 
  passport.authenticate('jwt', { session: false }), 
  uploader.single("avatar"),
  (req, res) => {

      Profile.findOne({account: req.user._id})
        .then(profile => {
         
          if (!profile) {
            let file = req.file;
            let path = proxy + file.path.split("uploads")[1];

            const profile = {
              account: req.user._id,
              avatar: path,
              email: req.body.email,
              position: req.body.position,
              contact_number: req.body.contact_number
            }
            const savedProfile = new Profile(profile);
           
            savedProfile
              .save()
              .then(profile => res.status(201).json(profile))
              .catch(err => res.status(404).json(err));
          } else {
            return res.status(201).json({message: 'Profile is already exist...'})
          }
        })
})

router.get('/my-profile', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOne({account: req.user.id})
    .then(profile => {
      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router;