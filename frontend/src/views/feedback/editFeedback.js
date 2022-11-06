import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {addRoom, getSelectedRoomByCode} from '../../controllers/room';
import {getCurrentReservations} from '../../controllers/reservation';
import {getSelectedReservation} from '../../controllers/reservation';
import {editFeedback, viewFeedback} from '../../controllers/feedback.js';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function EditFeedback() {

    const { id } = useParams();

    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [startDate,setStartDate ] = useState("");
    const [endDate, setEndDate] = useState("");
    const [comment, setComment] = useState("");

    const [canGoForward, setCanGoForward] = useState(false);

    const [customerNameArr, setCustomerNameArr] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState({});
    const [customerNames, setCustomerNames] = useState([]);

    const [feedbackData, setFeedbackData] = useState({});

    useEffect(() => {
        viewFeedback(id).then((res) => {
            console.log(res);
            setFeedbackData(res);
            setName(res.name);
            setEmail(res.email);
            setComment(res.comments);
        })
    }, [])

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const onReset = () => {
        setRoomCode("");
        setName("");
        setPhoneNumber("");
        setEmail("");
        setStartDate("");
        setEndDate("");
        setComment("");
    }

    

    const onAddRoom = () => {
        if (name == "" && email == "" && comment == "") {
            swal("Please fill the from to proceed")
        }else if (name == "") {
            swal("Please select a reservation")
        } else if (email == "") {
            swal("Please enter the email")
        } else if (!validateEmail(email)) {
            swal("Please enter a valid email")
        }else if (comment == "") {
            swal("Please enter the comment")
        } else {
            let newItem = {
                email: email,
                comments: comment
            }
            editFeedback(id, newItem)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Feedback updated successfully",
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
								Customer Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">EDIT FEEDBACK</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">Name</label>
                                            <input type="text" class="form-control"name="phoneNumber" disabled={true}
                                            onChange={(e) => setName(e.target.value)} value={name}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="nic">Phone Number</label>
                                            <input type="text" class="form-control"name="nic" disabled={true} value={feedbackData.phoneNumber}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">CheckIn Date</label>
                                            <input type="text" class="form-control"name="phoneNumber" disabled={true} value={feedbackData.checkInDate}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">CheckOut Date</label>
                                            <input type="text" class="form-control"name="phoneNumber" disabled={true}
                                            value={feedbackData.checkOutDate}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-12">
                                            <label for="phoneNumber">Email</label>
                                            <input type="text" class="form-control"name="phoneNumber"
                                            onChange={(e) => setEmail(e.target.value)} value={email}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-12">
                                            <label for="details">Comments</label>
                                            <textarea class="form-control" id="details" rows="3"
                                            onChange={(e) => setComment(e.target.value)} value={comment}/>
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

