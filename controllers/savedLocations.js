const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user');
const Location = require('../model/location')

const verifyToken = require('../middleware/verify-token');

router.get('/:savedLocationId', verifyToken, async (req, res) => {
    try {
        if (req.user._id !== req.params.userId){
            return res.status(403).json({ err: "Unauthorized"});
        }

        const location = await Location.findById(req.params.savedLocationId)
        
        return res.status(200).json({ location })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router