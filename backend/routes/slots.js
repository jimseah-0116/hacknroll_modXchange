const express = require('express');

const router = express.Router();

const {
    getSlots,
    createSlot,
    deleteSlot
} = require('../controllers/slotController');

//Use these routes in server.js
//create routes and call controllers accrodingly
router.get('/', getSlots);


//Add new slot
router.post('/', createSlot);

//delete a slot
router.delete('/:id', deleteSlot);

module.exports = router;