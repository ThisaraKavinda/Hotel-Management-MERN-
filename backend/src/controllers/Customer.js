import {customerModel} from "../models/Customer.js";

export const addCustomer = async (req, res) => {
    // console.log(req.body);
    const newCustomer = new customerModel({
        name: req.body.name,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber ,
        addressLine1: req.body.addressLine1 , 
        addressLne2: req.body.addressLne2 ,
        city: req.body.city ,
        state: req.body.state ,
        zipCode: req.body.zipCode ,
        email: req.body.email
    })

    newCustomer = await newCustomer.save().then(()=>{
        res.send(newCustomer);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Coludn't add the customer",error:err.message})
    })
}

export const viewCustomers = async (req, res) => {
    await customerModel.find().then((customers)=>{
        res.send(customers);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const getCustomer = async (req, res) => {
    let nic = req.params.nic;
    await customerModel.find({nic: nic}).then((customer)=>{
        res.send(customer);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with retrieving data",error:err.message})
    })
}

export const editCustomer = async (req, res) => {
    let id = req.params.id;
    
    const newCustomer = {
        name: req.body.name,
        nic: req.body.nic,
        phoneNumber: req.body.phoneNumber ,
        addressLine1: req.body.addressLine1 , 
        addressLne2: req.body.addressLne2 ,
        city: req.body.city ,
        state: req.body.state ,
        zipCode: req.body.zipCode ,
        email: req.body.email
    };

    newCustomer = await customerModel.findByIdAndUpdate(id, newCustomer).then((newCustomer)=>{
        res.status(200).send({status: "Customer Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message})
    })
}

export const deleteCustomer = async (req, res) => {
    let id = req.params.id;
    await customerModel.findByIdAndDelete(id).then((customer)=>{
        res.send(customer);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message})
    })
}
