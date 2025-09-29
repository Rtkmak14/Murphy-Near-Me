const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user');

const verifyToken = require('../middleware/verify-token');

router.get('/:savedLocation', verifyToken, (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
})

module.exports = router