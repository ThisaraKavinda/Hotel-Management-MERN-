import mongoose from  'mongoose';

const Schema = mongoose.Schema;

const revenueSchema = new Schema({

    reservationId: {
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
    type: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    price: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },

});

export const Revenue = mongoose.model('revenue',revenueSchema);