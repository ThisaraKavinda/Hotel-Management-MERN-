import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {getSelectedHouseKeeper, editHouseKeeper} from '../../controllers/houseKeeper'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function EditHouseKeeper() {

    const { id } = useParams();

    const [houseKeeperData, setHouseKeeperData] = useState({});

    const [dob, setDob] = useState(new Date());
    const [today, setToday] = useState(new Date());
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [joinedDate, setJoinedDate] = useState(new Date());

    useEffect(() => {
        getSelectedHouseKeeper(id).then((result) => {
            console.log(result);
            setHouseKeeperData(result);
            setName(result.name);
            setGender(result.gender);
            setMobile(result.mobile);
            setAddress(result.address);

            let dobArr = result.dob.split('-');
            console.log(dobArr)
            setDob(new Date(dobArr[0], dobArr[1] -1, dobArr[2]));
            let joinedDateArr = result.joinedDate.split('-');
            setJoinedDate(new Date(joinedDateArr[0], joinedDateArr[1]-1, joinedDateArr[2]));
        });
    }, []);

    const onReset = () => {
        getSelectedHouseKeeper(id).then((result) => {
            console.log(result);
            setHouseKeeperData(result);
            setName(result.name);
            setGender(result.gender);
            setMobile(result.mobile);

            let dobArr = result.dob.split('-');
            setDob(new Date(dobArr[0], dobArr[1] -1, dobArr[2]));
            let joinedDateArr = result.joinedDate.split('-');
            setJoinedDate(new Date(joinedDateArr[0], joinedDateArr[1]-1, joinedDateArr[2]));
        });
    }

    const onEditHouseKeeper = () => {
        // if (roomCode == "" && type == "" && price == "" && facilities == "") {
        //     swal("Please fill the from to proceed")
        // }else if (roomCode == "") {
        //     swal("Please enter a room code")
        // } else if (type == "") {
        //     swal("Please select a type")
        // }else if (price == "" || isNaN(price)) {
        //     swal("Please enter a valid price")
        // } else if (facilities == "") {
        //     swal("Please enter facilities")
        // } else {
            const newItem = {
                name:name,
                gender: gender,
                dob: dob,
                mobile: mobile,
                address: address,
                joinedDate: joinedDate,
            }
            editHouseKeeper(newItem, id)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "House Keeper updated successfully",
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
    

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>

			<Navbar />

			<div class="main" style={{backgroundColor: '#D3D3D3'}}>

				{/* top nav */}

				<main class="content mt-3">
					<div class="container-fluid">

                    <div class="header">
							<h1 class="header-title mt-1">
								House Keeper Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Submit the following form to edit the house keeper</h5>
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
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onEditHouseKeeper}>Add</button>
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

