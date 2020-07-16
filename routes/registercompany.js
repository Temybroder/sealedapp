const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Register company
router.get('/registercompany', ensureAuthenticated, (req, res) =>
  res.render('registercompany', {
    user: req.user
  })
);
 




//Register Private Limited Liability company 

router.get('/privatelimited', ensureAuthenticated, (req, res) =>
  res.render('privatelimited', {
    user: req.user
  })
);
 




//Register Limited by guarantee via Form Filling
router.get('/limitedbyguarantee', ensureAuthenticated, (req, res) =>
  res.render('limitedbyguarantee', {
    user: req.user
  })
);
//Register Limited by guarantee via Details Upload
router.get('/limitedbyguarantee', ensureAuthenticated, (req, res) =>
  res.render('limitedbyguarantee', {
    user: req.user
  })
);





//Register Business Name via Form Filling
router.get('/bizname', ensureAuthenticated, (req, res) =>
  res.render('bizname', {
    user: req.user
  })
);
//Register Business Name via Details Upload
router.get('/uploadbizname', ensureAuthenticated, (req, res) =>
  res.render('uploadbizname', {
    user: req.user
  })
);


//Register Cooperative

router.get('/cooperative', ensureAuthenticated, (req, res) =>
  res.render('cooperative', {
    user: req.user
  })
);
 //Register Cooperative via Details Upload
router.get('/uploadcoop', ensureAuthenticated, (req, res) =>
res.render('uploadcoop', {
  user: req.user
})
);




module.exports = router;