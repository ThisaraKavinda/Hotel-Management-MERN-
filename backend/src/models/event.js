import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    type: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    totalCount: {
        type: String,
    },
    locationType: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
});

export const Event = mongoose.model('events', eventSchema);