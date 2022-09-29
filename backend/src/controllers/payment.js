import {Payment} from "../models/payment.js";

export const addPayment = async (req, res) => {
    // console.log(req.body);
    let newPayment = new Payment({
        reservationId: req.body.reservationId,
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber ,
        type: req.body.type , 
        details: req.body.details ,
        price: req.body.price ,
        date: req.body.date ,
        time: req.body.time ,
    })

    newPayment = await newPayment.save().then((payment)=>{
        res.send(payment);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the Payment",error:err.message})
    })
}

export const viewPayments = async (req, res) => {
    await Payment.find().then((payment)=>{
        res.send(payment);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getPaymentById = async (req, res) => {
    let id = req.params.id;
    await Payment.findById(id).then((payment)=>{
        res.send(payment);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getPaymentsByReservation = async (req, res) => {
    let id = req.params.id;
    await Payment.find({reservationId: id}).then((payment)=>{
        res.send(payment);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editPayment = async (req, res) => {
    let id = req.params.id;
    
    let newPayment = {
        reservationId: req.body.reservationId,
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber ,
        type: req.body.type , 
        details: req.body.details ,
        price: req.body.price ,
        date: req.body.date ,
        time: req.body.time ,
    };

    newPayment = await Payment.findByIdAndUpdate(id, newPayment).then((newPayment) => {
        res.status(200).send({status: "Payment Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deletePayment = async (req, res) => {
    let id = req.params.id;
    await Payment.findByIdAndDelete(id).then((payment) => {
        res.send(payment);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}