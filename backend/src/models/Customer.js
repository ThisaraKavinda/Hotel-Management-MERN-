import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    
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
    }
});

export const customerModel = mongoose.model('customers', customerSchema);