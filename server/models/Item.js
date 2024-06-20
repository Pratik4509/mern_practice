const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Item", itemSchema);