import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLne2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    numOfAdults: {
        type: String,
        required: true,
    },
    numOfChildren: {
        type: String,
        required: true,
    }
});

export const Reservation = mongoose.model('reservations', reservationSchema);