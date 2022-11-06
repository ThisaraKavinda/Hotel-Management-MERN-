import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import DatePicker from "react-datepicker";

import {addPayment} from '../../controllers/payment';
import {addRevenue} from '../../controllers/revenue';
import {getCurrentReservations} from '../../controllers/reservation';

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export default function AddRevenue() {

    const [reservationId, setReservationId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");
    const [price, setPrice] = useState("");
    
    const [customerNameArr, setCustomerNameArr] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState({});
    const [customerNames, setCustomerNames] = useState([]);

    useEffect(() => {
        getCurrentReservations().then((res) => {
            console.log(res)
            setReservations(res)
            let customers = [];
            let names = [];
            for (const reservation of res) {
                customers.push({ value: reservation.name, label: reservation.name + " - " + reservation.room + " (" + reservation.roomType + ")" }) 
                names.push(reservation.name);
            }
            setCustomerNameArr(customers);
            setCustomerNames(names);
        })
    }, [])

    const onAddPayment = () => {
        if (customerName == "" && type == "" && price =="") {
            swal("Please fill the form to add a payment")
        } else if (customerName == "") {
            swal("Please select a customer")
        }else if (type == "") {
            swal("Please select a revenue type")
        }else if (price == "") {
            swal("Please enter the amount for the revenue")
        }else if (isNaN(price)) {
            swal("Please enter a valid amount for the revenue")
        } else {
            let dateTime = new Date();
            let month = dateTime.getUTCMonth() + 1; //months from 1-12
            if (month < 10)
                month = "0" + month;
            let day = dateTime.getUTCDate();
            let year = dateTime.getUTCFullYear();
            const date = year + "-" + month + "-" + day;
            dateTime = dateTime.toTimeString();
            const time = dateTime.split(' ')[0]
            console.log(date + " " + time);
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
            addRevenue(newItem)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Revenue added successfully",
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
        setReservationId("");
        setCustomerName("");
        setPhoneNumber("");
        setType("");
        setDetails("");
        setPrice("");
    }

    const onChangeName = (e) => {
        setCustomerName(e.value);
        const index = customerNames.indexOf(e.value);
        setSelectedReservation(reservations[index])
        setReservationId(reservations[index]._id);
        console.log(reservations[index]._id)
        setPhoneNumber(reservations[index].phoneNumber)
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
								Revenue Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">ADD NEW REVENUE</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="type">Reservation</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={customerNameArr}
                                            onChange={onChangeName}
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="phoneNumber">Phone Number</label>
                                            <input type="text" class="form-control"name="phoneNumber" disabled={true}
                                            onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="type">Type</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={[
                                                { value: 'Buffet', label: 'Buffet'},
                                                { value: 'Golf', label: 'Golf'},
                                                { value: 'Pool', label: 'Pool'},
                                                { value: 'Other Indoor activities', label: 'Other Indoor activities'},
                                                { value: 'Other Outdoor activities', label: 'Other Outdoor activities'}
                                            ]}
                                            onChange={((e) => {setType(e.value)})}
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
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onAddPayment}>Add</button>
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

