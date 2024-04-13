const express = require('express');
const router = express.Router();
const {getCart,addCart} = require('../Controller/cartController');

router.get('/:userId', getCart);
router.post('/add-to-cart', addCart);

module.exports = router;