import {Room} from "../models/room.js";

export const addRoom = async (req, res) => {
    // console.log(req.body);
    const newRoom = new Room({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price ,
        isAvailable: req.body.isAvailable , 
        isAc: req.body.isAc ,
        facilities: req.body.facilities
    })

    newRoom = await newRoom.save().then((room)=>{
        res.send(room);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the room",error:err.message})
    })
}

export const viewRooms = async (req, res) => {
    await Room.find().then((rooms)=>{
        res.send(rooms);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getRoom = async (req, res) => {
    let id = req.params.id;
    await Room.findById(id).then((room)=>{
        res.send(room);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editRoom= async (req, res) => {
    let id = req.params.id;
    
    let newRoom = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price ,
        isAvailable: req.body.isAvailable , 
        isAc: req.body.isAc ,
        facilities: req.body.facilities
    }

    newRoom = await Room.findByIdAndUpdate(id, newRoom).then((newRoom) => {
        res.status(200).send({status: "Room Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteRoom = async (req, res) => {
    let id = req.params.id;
    await Room.findByIdAndDelete(id).then((room)=>{
        res.send(room);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}