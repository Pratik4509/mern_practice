const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    type: {
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        required: true
    },
    raisedOn: {
        type: "date",
        required: true
    },
    description: {
        type: "string",
        // required: true
    },
    comments: {
        type: "string",
        // required: true
    }
})

module.exports = mongoose.model('requests', requestsSchema);