import {HouseKeeper} from "../models/houseKeeper.js";

export const addHouseKeeper = async (req, res) => {
    // console.log(req.body);
    const newHouseKeeper = new HouseKeeper({
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender ,
        mobile: req.body.mobile , 
        address: req.body.address ,
        joinedDate: req.body.joinedDate
    })

    newHouseKeeper = await newHouseKeeper.save().then((newHouseKeeper)=>{
        res.send(newHouseKeeper);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the HouseKeeper",error:err.message})
    })
}

export const viewHouseKeepers = async (req, res) => {
    await HouseKeeper.find().then((housekeepers)=>{
        res.send(housekeepers);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getHouseKeeper = async (req, res) => {
    let id = req.params.id;
    await HouseKeeper.findById(id).then((housekeeper)=>{
        res.send(housekeeper);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editHouseKeeper= async (req, res) => {
    let id = req.params.id;
    
    let newHousekeeper = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender ,
        mobile: req.body.mobile , 
        address: req.body.address ,
        joinedDate: req.body.joinedDate
    }

    newHousekeeper = await HouseKeeper.findfindByIdAndUpdate(id, newHousekeeper).then((newHousekeeper) => {
        res.status(200).send({status: "HouseKeeper Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteHouseKeeper = async (req, res) => {
    let id = req.params.id;
    await HouseKeeper.findByIdAndDelete(id).then((housekeeper)=>{
        res.send(housekeeper);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}