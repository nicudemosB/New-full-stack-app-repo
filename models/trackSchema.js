const mongoose = require('mongoose')
const trackSchema = new mongoose.Schema({
    name: {type: 'String'},
    age: {type: Number},
    make: {type: 'String'},
    model: { type: 'String'},
    timeSlot: {type: 'String'}
})

const Track = mongoose.model('Track', trackSchema)
module.exports = Track