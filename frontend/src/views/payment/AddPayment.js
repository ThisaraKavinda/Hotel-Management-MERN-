import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {addHouseKeeper} from '../../controllers/houseKeeper';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function AddPayment() {

    const [dob, setDob] = useState(new Date());
    const [today, setToday] = useState(new Date());
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");

    const onAddReservation = () => {
        if (name == "" && gender == "" && mobile == "" && address == "") {
            swal("Please fill the form to add a house keeper")
        } else if (name == "") {
            swal("Please enter the name")
        }else if (dob == "") {
            swal("Please enter the date of birth")
        }else if (gender == "") {
            swal("Please enter the gender")
        }else if (mobile == "") {
            swal("Please enter the mobile number")
        }else if (mobile.length < 10) {
            swal("Please enter a valid mobile number")
        }else if (address == "") {
            swal("Please enter the address")
        } else {
            const newItem = {
                name: name,
                dob: dob,
                gender: gender,
                mobile: mobile,
                address: address,
                joinedDate: new Date(),
                
            }
            addHouseKeeper(newItem)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "House Keeper added successfully",
                        icon: 'success',
                        timer: 2000,
                        button: false,
                    });
                } else {
                    swal({
                        title: "Error!",
                        text: "Something went wrong went wrong. Try again",
                        icon: 'error',
                        dangerMode: true,
                        button: false,
                    })
                }
            })
            .catch ((err) => {
                swal({
                    title: "Error!",
                    text: "Something went wrong with the network. Try reloading page",
                    icon: 'error',
                    dangerMode: true,
                    button: true,
                })
                .then((reload) => {
                    window.location.reload();
                });
            })
        }
    }

    const onReset = () => {
        setName("");
        setDob("");
        setGender("");
        setMobile("");
        setAddress("");
    }

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>

			<Navbar />

			<div class="main" style={{backgroundColor: '#D3D3D3'}}>

				{/* top nav */}

				<main class="content mt-3">
					<div class="container-fluid">

						<div class="header">
							<h1 class="header-title mt-1">
								Payment Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Submit the following form to add a new payment</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="name">Name</label>
                                            <input type="text" class="form-control"name="name" 
                                            onChange={(e) => setName(e.target.value)} value={name}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="zipCode">Date of Birth</label>
                                            <DatePicker
                                                selected={dob}
                                                onChange={(date:Date) => setDob(date)}
                                                className="form-control"
                                                customInput={
                                                <input
                                                    type="text"
                                                    id="validationCustom01"
                                                    placeholder="First name"
                                                />
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="mobile">Phone Number</label>
                                            <input type="text" class="form-control"name="roomCode" 
                                            onChange={(e) => setMobile(e.target.value)} value={mobile}/>
                                        </div>
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="gender">Gender</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={
                                                [
                                                    { value: 'Male', label: 'Male' },
                                                    { value: 'Female', label: 'Female' },
                                                    { value: 'Other', label: 'Other' }
                                                ]
                                            }
                                            onChange={(e) => setGender(e.value)}
                                            />
                                        </div>
                                    </div>


                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-12">
                                            <label for="address">Address</label>
                                            <input type="text" class="form-control"name="address" 
                                            onChange={(e) => setAddress(e.target.value)} value={address}/>
                                        </div>
                                    </div>
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAddReservation}>Add</button>
                                            <button class="btn btn-primary w-75 mx-3 py-2 fw-semibold"
                                                style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width:75 }} 
                                                onClick={onReset} >Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

					</div>
				</main>
			</div>
		</div>
	)

}

