const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Find Lawyer
router.get('/findlawyer', ensureAuthenticated, (req, res) =>
  res.render('findlawyer', {
    user: req.user
  })
);
 







module.exports = router;
