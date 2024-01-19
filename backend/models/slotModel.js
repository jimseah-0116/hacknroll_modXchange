const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slotSchema = new Schema({
    module: {
        type: String,
        required: true
    },
    lessonType: {
        type: String,
        required: true
    },
    classNo: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    weeks: {
        type: Array,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    tele: {
        type: String,
        required: true
    },
    classNoWanted: {
        type: String,
        required: true
    },
    dayWanted: {
        type: String,
        required: true
    },
    startTimeWanted: {
        type: String,
        required: true
    },
    endTimeWanted: {
        type: String,
        required: true
    },
    weeksWanted: {
        type: Array,
        required: true
    },
    venueWanted: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);

