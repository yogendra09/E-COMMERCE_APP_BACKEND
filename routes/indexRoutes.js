const express = require('express');
const router = express.Router();

const { home,create } = require('../controllers/indexController');

//home
router.get('/',home);

//user register
router.post('/',)





module.exports = router;