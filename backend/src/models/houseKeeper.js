import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const houseKeeperSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    joinedDate: {
        type: String,
        required: true,
    },
});

export const HouseKeeper = mongoose.model('housekeepers', houseKeeperSchema);