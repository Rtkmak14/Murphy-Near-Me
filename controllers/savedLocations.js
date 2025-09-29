const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user');
const Location = require('../models/location')

const verifyToken = require('../middleware/verify-token');


router.get("/", verifyToken, async (req,res)=> {
    try {
        const locations = await Location.find({owner: req.params.userId}).populate("owner")
        res.status(201).json({locations})
    }

    catch (err) {
        res.status(500).json({err:err.message})
    }
})

router.post("/", verifyToken, async (req,res)=> {
    try {
        req.body.owner = req.user._id
        const location = await Location.create(req.body)
        location._doc.owner = req.user
        res.status(201).json({location})
    }

    catch (err) {
        res.status(500).json({ err: err.message })
    }
})

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