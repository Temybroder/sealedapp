const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Changename
router.get('/changename', ensureAuthenticated, (req, res) =>
  res.render('changename', {
    user: req.user
  })
);
 







module.exports = router;
