const express = require('express');
const { check, body } = require('express-validator');

const router = express.Router();
const User = require('../models/user');

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/reset', authController.getReset);
router.get('/reset/:token', authController.getNewPassword);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'abc@abc.com') {
        //   throw new Error('This email address is forbidden');
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-mail exists already.');
          }
        });
      })
      .normalizeEmail(),

    body(
      'password',
      'Please enter a valid password with atleast 5 characters and numbers'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      })
  ],
  authController.postSignup
);
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password', 'Please enter a valid password')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);
router.post('/logout', authController.postLogout);
router.post('/reset', authController.postReset);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
