const { Schema, Types: { ObjectId } } = require('mongoose')
const Point = require('./point')


module.exports = new Schema({
    name: { type: String, required: true, enum: ['rail', 'box', 'transition'] },
    size: { type: String, required: true, enum: ['s', 'm', 'l', 'xl'] },
    description: String,
    image: String,
    location: {
        type: String,
        enum: ['Feature'],
        properties: Object,
        geometry: Point //TODO check if works
        // type: {
        //     type: String,
        //     enum: ['Point'],
        //     required: true
        // },
        // coordinates: {
        //     type: [Number],
        //     required: true
        // }
    }

}) 