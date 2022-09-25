import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {addRoom} from '../../controllers/room'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function AddRoom() {

    const [roomCode, setRoomCode] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [facilities, setFacilities] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [isAc, setIsAc] = useState(false);

    const onChangeAvailability = () => {
        setIsAvailable(!isAvailable);
    }

    const onChangeIsAc = () => {
        setIsAc(!isAc);
    }

    const onReset = () => {
        setRoomCode("");
        setType("");
        setPrice("");
        setFacilities("");
        setIsAvailable(false);
        setIsAc(false);
    }

    const onAddRoom = () => {
        if (roomCode == "" && type == "" && price == "" && facilities == "") {
            swal("Please fill the from to proceed")
        }else if (roomCode == "") {
            swal("Please enter a room code")
        } else if (type == "") {
            swal("Please select a type")
        }else if (price == "" || isNaN(price)) {
            swal("Please enter a valid price")
        } else if (facilities == "") {
            swal("Please enter facilities")
        } else {
            addRoom(roomCode, type, price, isAvailable, isAc, facilities)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Room added successfully",
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

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>

			<Navbar />

			<div class="main" style={{backgroundColor: '#D3D3D3'}}>

				{/* top nav */}

				<main class="content mt-3">
					<div class="container-fluid">

						<div class="header">
							<h1 class="header-title mt-1">
								Rooms Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Submit the following form to add a new item</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="roomCode">Room Code</label>
                                            <input type="text" class="form-control"name="roomCode" 
                                            onChange={(e) => setRoomCode(e.target.value)} value={roomCode}/>
                                        </div>
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="type">Type</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={
                                                [
                                                    { value: 'Single', label: 'Single' },
                                                    { value: 'Double', label: 'Double' },
                                                    { value: 'Triple', label: 'Triple' },
                                                    { value: 'Queen', label: 'Queen' },
                                                    { value: 'Executive ', label: 'Executive' }
                                                ]
                                            }
                                            onChange={(e) => setType(e.value)}
                                            />
                                        </div>
                                    </div>

                                        <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-6">
                                                <label for="price">Price per day</label>
                                                <input type="text" class="form-control" name="price" 
                                                onChange={(e) => setPrice(e.target.value)} value={price} />
                                            </div>
                                            
                                        </div>

                                        <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-6 mb-2 ml-2">
                                                <label for="formFile" class="form-label">Availability</label>
                                                <div class="col-6 mb-1 d-flex align-items-center" >
                                                    <Switch onChange={onChangeAvailability} checked={isAvailable} />
                                                    {isAvailable ? <p class="fw-semibold monospace mb-0 mx-3 text-success"> Available </p> : 
                                                    <p class="fw-semibold monospace mb-0 mx-3 text-danger">Not Available </p>}
                                                </div>
                                            </div>                                            
                                            <div class="mb-3 col-md-6 mb-2 ml-2">
                                                <label for="formFile" class="form-label">Air conditioned</label>
                                                <div class="col-6 mb-1 d-flex align-items-center" >
                                                    <Switch onChange={onChangeIsAc} checked={isAc} />
                                                    {isAc ? <p class="fw-semibold monospace mb-0 mx-3 text-success"> Air Conditioned </p> : 
                                                    <p class="fw-semibold monospace mb-0 mx-3 text-danger">Not Air Conditioned </p>}
                                                </div>
                                            </div> 
                                        </div> 

                                        <div class="row px-4 d-flex justify-content-between mb-2">
                                            <div class="mb-3 col-md-12">
                                                <label for="price">Facilities</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                                onChange={(e) => setFacilities(e.target.value)} value={facilities}></textarea>
                                            </div>
                                            
                                        </div>  
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAddRoom}>Add</button>
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

