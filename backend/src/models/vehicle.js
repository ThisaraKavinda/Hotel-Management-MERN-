import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    
    number: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    numOfSeats: {
        type: String,
        required: true,
    },
    driver: {
        type: String,
        required: true,
    },
    pricePerKM: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    }
});

export const Vehicle = mongoose.model('vehicles', vehicleSchema);