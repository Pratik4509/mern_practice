const express = require('express');
const router = express.Router();
const Requests = require('../models/Requests')

router.get('/', async (req, res) => {
    try {
        const data = await Requests.find();
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.post('/', async (req, res) => {
    const body = await req.body;
    const filter = {}
    filter.email = body.email
    filter.$or = [
        {status: 'new'},
        {status: 'in progress'},
    ]
    try {
        const existingRequest = await Requests.find(filter);
        console.log(existingRequest)
        if (existingRequest.length > 0) {
            return res.status(403).json({
                type: "Forbidden",
                message: "You cannot raise multiple requests at a time"
            })
        }
        const requests = new Requests(body);
        const newRequests = await requests.save();
        res.status(201).json({
            type: "Created",
            message: `Request registered successfully with request id ${newRequests._id}`
        });
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router;

// {{email: "userone@abc.com"}, {$or: [{status: 'new'}, {status: 'in progress'}]}}
