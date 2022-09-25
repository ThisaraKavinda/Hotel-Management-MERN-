import {Vehicle} from "../models/vehicle.js";

export const addVehicle = async (req, res) => {
    // console.log(req.body);
    const newVehicle = new Vehicle({
        number: req.body.number,
        type: req.body.type,
        numOfSeats: req.body.numOfSeats ,
        driver: req.body.driver, 
        pricePerKM: req.body.pricePerKM ,
        isAvailable: req.body.isAvailable
    })

    newVehicle = await newVehicle.save().then((vehicle)=>{
        res.send(vehicle);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the vehicle",error:err.message})
    })
}

export const viewVehicles = async (req, res) => {
    await Vehicle.find().then((vehicles)=>{
        res.send(vehicles);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getVehicle = async (req, res) => {
    let id = req.params.id;
    await Vehicle.findById(id).then((vehicle)=>{
        res.send(vehicle);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editVehicle= async (req, res) => {
    let id = req.params.id;
    
    let newVehicle = {
        number: req.body.number,
        type: req.body.type,
        numOfSeats: req.body.numOfSeats ,
        driver: req.body.driver, 
        pricePerKM: req.body.pricePerKM ,
        isAvailable: req.body.isAvailable
    }

    newVehicle = await Room.findByIdAndUpdate(id, newVehicle).then((newVehicle) => {
        res.status(200).send({status: "Vehicle Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteVehicle = async (req, res) => {
    let id = req.params.id;
    await Vehicle.findByIdAndDelete(id).then((vehicle)=>{
        res.send(vehicle);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}