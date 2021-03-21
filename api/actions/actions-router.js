// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const ActionsMiddleware = require('../middleware/ActionsMiddleware');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', ActionsMiddleware.ValidateId, (req, res) => {
    res.status(200).json(req.action)
});

router.post('/', ActionsMiddleware.ValidatePost, async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', ActionsMiddleware.ValidateId, ActionsMiddleware.ValidateBody, async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try {
        if (typeof changes.completed !== "boolean") {
            res.status(400).json({message: "completed should be true or false"})
        } else {
            await Actions.update(id, changes);
            res.status(200).json(changes);
        }
   
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', ActionsMiddleware.ValidateId, async (req, res) => {
    const {id} = req.params;
    try {
        await Actions.remove(id);
        res.status(200).json({message: "Action has been deleted"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;