//import workout model to interact with the collection
const Slot = require('../models/slotModel');
const mongoose = require('mongoose');
//get all slots
const getSlots = async (req, res) => {
    try {
        const slots = await Slot.find({}).sort({createdAt: -1});
        res.status(200).json(slots);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//post new slot
const createSlot = async (req, res) => {
    try {
        const slot = await Slot.create(req.body);
        res.status(200).json(slot);
    } catch (err) {
        res.status(400).json({error: err.message});
    };
}

//delete a slot
const deleteSlot = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Slot does not exist'});
    }
    const slot = await Slot.findByIdAndDelete(id);
    if (!slot) {
        return res.status(404).json({error: 'Slot does not exist'});
    }
    res.status(200).json(slot);
}
module.exports = {getSlots, createSlot, deleteSlot}