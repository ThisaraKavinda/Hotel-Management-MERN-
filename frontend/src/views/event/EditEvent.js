import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {getSelectedEvent, editEvent, getEventsForSelectedDateAndLocation} from '../../controllers/event'

import DatePicker from "react-datepicker";

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function EditEvent() {

    const { id } = useParams();

    const [eventData, setEventData] = useState({});
    const [type, setType] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [totalCount, setTotalCount] = useState("");
    const [locationType, setLocationType] = useState("");
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState();
    const [endTime, setEndtime] = useState();

    const [available, setAvailable] = useState(false);

    const today = new Date();

    useEffect(() => {
        getSelectedEvent(id).then((result) => {
            console.log(result);
            setEventData(result);
            setType(result.type);
            setCustomerName(result.customerName);
            setPhoneNumber(result.phoneNumber);
            setAddress(result.address);
            setTotalCount(result.totalCount);
            setLocationType(result.locationType);
            let dateArr = result.date.split('-');
            console.log(dateArr)
            setDate(new Date(dateArr[0], dateArr[1] -1, dateArr[2]));
            console.log(result.time.split(' - ')[0]);
            setStartTime(result.time.split(' - ')[0]);
            setEndtime(result.time.split(' - ')[1]);
        });
    }, []);

    const onReset = () => {
        getSelectedEvent(id).then((result) => {
            console.log(result);
            setEventData(result);
            setType(result.type);
            setCustomerName(result.customerName);
            setPhoneNumber(result.phoneNumber);
            setAddress(result.address);
            setTotalCount(result.totalCount);
            setLocationType(result.locationType);
            let dateArr = result.checkInDate.split('-');
            console.log(dateArr)
            setDate(new Date(dateArr[0], dateArr[1] -1, dateArr[2]));
            setStartTime(result.time.split(' - ')[0]);
            setEndtime(result.time.split(' - ')[1]);
        });
    }

    const onEditRoom = async () => {
        let x = await onCheckAvailability()
        if (!available && locationType == eventData.locationType && date.toISOString().substring(0, 10) == eventData.date.substring(0, 10)) {
            swal("Cannot book an event for the selected date and location. Please try again with a different location or date")
            return;
        }
        if (x!= undefined && !x) {
            swal("Cannot book an event for the selected date and location. Please try again with a different location or date")
            return;
        }
        if (customerName == "" && phoneNumber == "" && address == "" && totalCount == "" && startTime == "" && endTime == "" && type =="" ) {
            swal("Please fill the from to proceed")
        } else if (customerName == "") {
            swal("Please enter the customer name")
        } else if (phoneNumber == "") {
            swal("Please enter the Phone number")
        }else if (address == "") {
            swal("Please enter the address")
        } else if (type == "") {
            swal("Please select a type")
        }else if (totalCount == "") {
            swal("Please enter the total count")
        } else if (isNaN(totalCount)) {
            swal("Please enter a valid number for total count")
        } else if (startTime == "") {
            swal("Please enter the start time")
        }else if (endTime == "") {
            swal("Please enter the end time")
        } else {
            const newItem = {
                type: type,
                customerName: customerName,
                phoneNumber: phoneNumber,
                address: address,
                totalCount: totalCount,
                locationType: locationType,
                date: date.toISOString().substring(0, 10),
                time: startTime + " - " + endTime
            }
            editEvent(newItem, id)
            .then((result) => {
                if (result != undefined) {
                    swal({
                        title: "Success!",
                        text: "Event updated successfully",
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

    const locationArr = [
        { value: 'Hall A', label: 'Hall A' },
        { value: 'Hall B', label: 'Hall B' },
        { value: 'Outdoor', label: 'Outdoor' }
    ]

    const typeArr = [
        { value: 'Wedding', label: 'Wedding' },
        { value: 'Birthday Party', label: 'Birthday Party' },
        { value: 'Engagement Party', label: 'Engagement Party' },
        { value: 'Annivesary Party', label: 'Annivesary Party' },
        { value: 'Farewell Party', label: 'Farewell Party' },
        { value: 'Bride to be', label: 'Annivesary Party' },
        { value: 'Other', label: 'Other' }
    ]

    const onCheckAvailability = async () => {
        if (locationType == eventData.locationType && date.toISOString().substring(0, 10) == eventData.date.substring(0, 10)) {
            setAvailable(true)
            return true
        }else {
            const dateString = date.toISOString();
            console.log(dateString)
            await getEventsForSelectedDateAndLocation(dateString.substring(0,10), locationType).then((events) => {
                console.log(events);
                if (events.length <= 0) {
                    setAvailable(true)
                    return true
                } else {
                    setAvailable(false)
                    swal("Cannot book an event for the selected date and location. Please try again with a different location or date")
                    return false;
                }
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
								Events Management
							</h1>

						</div>

						<div class="col-md-12">
                            <div class="card">
                                <div class="card-body" >

                                    <div class="row mb-4">
                                        <h5 class="fw-semibold fs-4">EDIT EVENT</h5>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="zipCode">Date</label>
                                            <DatePicker
                                                selected={date}
                                                onChange={(date:Date) => {setDate(date); setAvailable(false); onCheckAvailability()}}
                                                className="form-control"
                                                customInput={
                                                <input
                                                    type="text"
                                                    id="validationCustom01"
                                                    placeholder="First name"
                                                />
                                                }
                                                minDate={today}
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="name">Location</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={locationArr}
                                            onChange={(e) => {setLocationType(e.value); setAvailable(false); onCheckAvailability()}}
                                            value = {
                                                locationArr.filter(option => 
                                                   option.label === locationType)
                                            }
                                            />
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2 pt-3">
                                        <div class="mb-3 col-md-6">
                                            <label for="name">Customer Name</label>
                                            <input type="text" class="form-control" name="name" 
                                            onChange={(e) => setCustomerName(e.target.value)} value={customerName}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="name">Phone Number</label>
                                            <input type="text" class="form-control" name="name" 
                                            onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
                                        </div>
                                    </div>


                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-12">
                                            <label for="address">Address</label>
                                            <input type="text" class="form-control"name="address" 
                                            onChange={(e) => setAddress(e.target.value)} value={address}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="type">Type</label>
                                            <Select
                                            isClearable
                                            isSearchable
                                            options={typeArr}
                                            onChange={(e) => setType(e.value)}
                                            value = {
                                                typeArr.filter(option => 
                                                   option.label === type)
                                            }
                                            />
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="totalCount">Total Count</label>
                                            <input type="text" class="form-control" name="totalCount" 
                                            onChange={(e) => setTotalCount(e.target.value)} value={totalCount}/>
                                        </div>
                                    </div>

                                    <div class="row px-4 mb-2">
                                        <div class="mb-3 col-md-6">
                                            <label for="startTime">Start time</label>
                                            <input type="time" class="form-control" name="startTime" 
                                            onChange={(e) => setStartTime(e.target.value)} value={startTime}/>
                                        </div>
                                        <div class="mb-3 col-md-6">
                                            <label for="endTime">End Time</label>
                                            <input type="time" class="form-control" name="endTime" 
                                            onChange={(e) => setEndtime(e.target.value)} value={endTime}/>
                                        </div>
                                    </div>  
                                                                                          
                                    <div class="row d-flex justify-content-center mb-2 mt-5">
                                        <div class="col-5 d-flex justify-content-center">
                                            <button class="btn btn-primary w-75 mx-5 py-2 fw-semibold" onClick={onEditRoom}>Update</button>
                                            <button class="btn btn-primary w-75 mx-3 py-2 fw-semibold"
                                                style={{ backgroundColor: '#ffffff', borderColor: '#081E3D', color: '#081E3D', marginLeft: 10, width:75 }} 
                                                onClick={onReset} >Cancel</button>
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

