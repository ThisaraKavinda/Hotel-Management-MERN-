import {Reservation} from "../models/reservation.js";

export const addReservation = async (req, res) => {
    // console.log(req.body);
    const newReservation = new Reservation({
        name: req.body.name,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber ,
        addressLine1: req.body.addressLine1 , 
        addressLne2: req.body.addressLne2 ,
        city: req.body.city ,
        state: req.body.state ,
        zipCode: req.body.zipCode ,
        email: req.body.email,
        checkInDate: req.body.checkInDate ,
        checkOutDate: req.body.checkOutDate ,
        roomType: req.body.roomType,
        numOfAdults: req.body.numOfAdults ,
        numOfChildren: req.body.numOfChildrens,
    })

    newReservation = await newReservation.save().then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the reservation",error:err.message})
    })
}

export const viewReservations = async (req, res) => {
    await Reservation.find().then((reservations)=>{
        res.send(reservations);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getReservationByNic = async (req, res) => {
    let nic = req.params.nic;
    await Reservation.findOne({nic: nic}).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getReservationById = async (req, res) => {
    let id = req.params.id;
    await Reservation.findById(id).then((reservation)=>{
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editReservation = async (req, res) => {
    let id = req.params.id;
    
    const newReservation = {
        name: req.body.name,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber ,
        addressLine1: req.body.addressLine1 , 
        addressLne2: req.body.addressLne2 ,
        city: req.body.city ,
        state: req.body.state ,
        zipCode: req.body.zipCode ,
        email: req.body.email,
        state: req.body.checkInDate ,
        zipCode: req.body.checkOutDate ,
        email: req.body.roomType,
        zipCode: req.body.numOfAdults ,
        email: req.body.numOfChildrens,
    };

    newReservation = await Reservation.findByIdAndUpdate(id, newReservation).then((newReservation) => {
        res.status(200).send({status: "Reservation Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteReservation = async (req, res) => {
    let id = req.params.id;
    await Reservation.findByIdAndDelete(id).then((reservation) => {
        res.send(reservation);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}