const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
    type: String, 
    required: true,
    },
    streetAddress: {
    type: String, 
    required: true,
    },
    city: {
    type: String, 
    required: true,
    },
    state: {
    type: String, 
    required: true,
    },
    owner: {
    type: mongoose.Schema.Types.objectId, 
    ref: 'User',
    },
    lat: Number,
    long: Number,
}); 

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;



