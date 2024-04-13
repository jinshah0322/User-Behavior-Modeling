const express = require('express');
const router = express.Router();
const {getCart,addCart} = require('../Controller/cartController');

router.get('/:userId', getCart);
router.post('/', addCart);

module.exports = router;