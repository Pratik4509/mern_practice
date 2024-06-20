const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
    // console.log(req.query)
    const { name = '', age = 0 } = req.query
    const filter = {};
    if (name) {
        filter.name = new RegExp(name, 'i')
    }
    if (age) {
        filter.age = { $gte: age };
    }
    try {
        const data = await Item.find(filter)
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(200).json({ message: 'No data' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Item.findById(id)
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
    const { name, description, age } = req.body;
    try {
        const existingItem = await Item.findOne({ name })
        if (existingItem) {
            return res.status(403).json({ message: 'Item already exists' })
        }

        const item = new Item({ description, name, age });
        const newItem = await item.save()
        res.status(201).json({ message: `Item Saved with id "${newItem.id}"` })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, age } = req.body;
    try {
        // const data = await Item.findById(id);
        pa = {
            name,
            description,
            age
        }
        const updatedItem = await Item.findByIdAndUpdate(id, pa)
        res.status(200).json({ message: "Data Updated", updatedItem })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/search/:query', async (req, res) => {
    const { query } = req.params;
    try {
        const data = await Item.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { description: new RegExp(query, 'i') },
            ]
        }) // find similar to search in both/multiple fileds at a time, returns if query exists in ANY OF the fields
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/search-many/:query', async (req, res) => {
    const { query } = req.params;
    try {
        const data = Item.find({})
    } catch (err) {

    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Item.findByIdAndDelete(id)
        if(!data) {
            return res.status(404).json({ message: "Item does not exists"})
        }
        res.status(200).json({message: "Item deleted successfully"})
    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router;


//_____________________________________________________________________________

// const data = await Item.find({name:query}) //normal find return all name that match query
//_____________________________________________________________________________

// const data = await Item.find({name: new RegExp(query, 'i')}) // find using RegExp that is simmilar to Like
//_____________________________________________________________________________

// const data = await Item.find({name:
//     {
//         $regex: query,
//         $options: 'i'
//     }
// }) // find similar to like using mongoose funtions/queries
//_____________________________________________________________________________

// const data = await Item.find({
//     $and : [
//         {name: new RegExp(query, 'i')},
//         {description: new RegExp(query, 'i')},
//     ]
// }) // find similar to search in both/multiple fileds at a time, returns if query exists in BOTH the fields

//_____________________________________________________________________________