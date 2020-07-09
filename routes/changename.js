const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Changename
router.get('/changename', ensureAuthenticated, (req, res) =>
  res.render('changename', {
    user: req.user
  })
);
 



//Change Name Punch Newspaper

router.get('/namepunch', ensureAuthenticated, (req, res) =>
  res.render('namepunch', {
    user: req.user
  })
);
 




//Change Name Sun Newspaper

router.get('/namethesun', ensureAuthenticated, (req, res) =>
  res.render('namethesun', {
    user: req.user
  })
);






//Change Name Guardian Newspaper

router.get('/nameguardian', ensureAuthenticated, (req, res) =>
  res.render('nameguardian', {
    user: req.user
  })
);





//Change Name Thisday Newspaper

router.get('/namethisday', ensureAuthenticated, (req, res) =>
  res.render('namethisday', {
    user: req.user
  })
);
 

//Change Name Vanguard Newspaper

router.get('/namevanguard', ensureAuthenticated, (req, res) =>
  res.render('namevanguard', {
    user: req.user
  })
);
 




module.exports = router;
