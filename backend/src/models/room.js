import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    isAc: {
        type: Boolean,
        required: true,
    },
    facilities: {
        type: String,
        required: true,
    },
});

export const Room = mongoose.model('rooms', roomSchema);