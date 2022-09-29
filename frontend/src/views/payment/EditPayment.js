import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {getSelectedPayment, editPayment} from '../../controllers/payment'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function EditPayment() {

    const { id } = useParams();

    const [reservationData, setReservationData] = useState({})
    const [reservationId, setReservationId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");
    const [price, setPrice] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        getSelectedPayment(id).then((result) => {
            console.log(result);
            setReservationData(result);
            setReservationId(result.reservationId);
            setCustomerName(result.customerName);
            setPhoneNumber(result.phoneNumber);
            setType(result.type);
            setDetails(result.details);
            setPrice(result.price);
            setTime(result.time);
            setDate(result.date);
        });
    }, []);

    const typeOptionsArr = [
        { value: 'Breakfast', label: 'Breakfast'},
        { value: 'Lunch', label: 'Lunch'},
        { value: 'Dinner', label: 'Dinner'},
        { value: 'Other Foods', label: 'Other Foods'},
        { value: 'Beverages', label: 'Beverages'},
        { value: 'Dining', label: 'Dining'}
    ]

    const onReset = () => {
        getSelectedPayment(id).then((result) => {
            console.log(result);
            setReservationData(result);
            setReservationId(result.reservationId);
            setCustomerName(result.customerName);
            setPhoneNumber(result.phoneNumber);
            setType(result.type);
            setDetails(result.details);
            setPrice(result.price);
            setTime(result.time);
            setDate(result.date);
        });
    }

    const onEditPayment = () => {
        if (customerName == "" && type == "" && price =="") {
            swal("Please fill the form to add a payment")
        } else if (customerName == "") {
            swal("Please select a customer")
        }else if (type == "") {
            swal("Please select a payment type")
        }else if (price == "") {
            swal("Please enter the amount for the payment")
        }else if (isNaN(price)) {
            swal("Please enter a valid amount for the payment")
        } else {
            const newItem = {
                reservationId: reservationId,
                customerName: customerName,
                phoneNumber: phoneNumber,
                type: type,
                details: details,
                price: price,
                date: date, 
                time: time      
            }
            editPayment(newItem, id)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Payment updated successfully",
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
								Payment Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">Submit the following form to edit the payment</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="reservation">Reservation</label>
                                            <input type="text" class="form-control"name="reservation" disabled={true}
                                             value={customerName}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">Phone Number</label>
                                            <input type="text" class="form-control"name="phoneNumber" disabled={true}
                                            value={phoneNumber}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="type">Type</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={typeOptionsArr}
                                            onChange={((e) => {setType(e.value)})}
                                            value = {
                                                typeOptionsArr.filter(option => 
                                                   option.label === type)
                                             }
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="price">Amount</label>
                                            <input type="text" class="form-control" name="price" 
                                            onChange={(e) => setPrice(e.target.value)} value={price}/>
                                        </div>
                                    </div>


                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-12">
                                            <label for="details">Details (Optional)</label>
                                            <textarea class="form-control" id="details" rows="3"
                                            onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
                                        </div>
                                    </div>
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onEditPayment}>Update</button>
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

