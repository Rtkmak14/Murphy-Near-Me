const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user');
const Location = require('../models/location')

const verifyToken = require('../middleware/verify-token');







//show specific location
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




//Delete Route 

router.delete('/:savedLocationId', verifyToken, async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.savedLocationId);
        // console.log(deletedLocation);
        if (!deletedLocation) {
            res.status(404);
            throw new Error('Location not Found');
        } return res.status(200).json({deletedLocation});
        // return res.status(200).json({ message: 'This is the delete route!' });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message })
        }
    }
});


module.exports = router