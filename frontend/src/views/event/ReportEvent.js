import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import {getCurrentReservations, getSelectedReservation} from '../../controllers/reservation.js';
import {viewPaymentsOfAReservation} from '../../controllers/payment.js';
import {getEventsForSelectedLocation} from "../../controllers/event.js";

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import logo from '../../img/logo/logo.png';

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function ReportEvent() {

    $("input").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        )
    }).trigger("change")

    const [loading, setLoading] = useState(true);

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState(false);

    const [roomList, setRoomList] = useState([]);
    const [room, setRoom] = useState("");
    const [roomId, setRoomId] = useState("");
    const [roomDetails, setRoomDetails] = useState({});

    const locationArr = [
        { value: 'Hall A', label: 'Hall A' },
        { value: 'Hall B', label: 'Hall B' },
        { value: 'Outdoor', label: 'Outdoor' }
    ]

    useEffect(() => {
        // getCurrentReservations().then((result) => {
		// 	console.log(result)
		// 	let rooms = [];
		// 	for (let item of result) {
		// 		rooms.push({ value: item._id, label: item.name })
		// 	}
		// 	setRoomList(rooms);
		// 	// avaiableRooms.push(result);
        // });
    }, [])

    // const getRoomDetails = async(id) => {
    //     await getSelectedReservation(id).then((res) => {
    //         setRoomDetails(res);
    //         // console.log(res);
    //         // console.log("ssssssssssssss")
    //     })
    // }

    async function appointmentReportGet() {
        await setLoading(true);
        if (room === '') {
            swal("Please select a Location");
        } else {
            setLoading(true);
            getEventsForSelectedLocation(roomId).then((result) => {
                console.log(result);
                setReportList(result);
                setHead(true);
            })
            .catch((err) => {
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
            .then ((result) => {
                result.json()
            })
            .then(json => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
        }
    }

    function downloadPDF() {

        const doc = new jsPDF();
        doc.setDrawColor(15, 52, 96);
        doc.setLineWidth(70);    
        doc.line(0, 0, 1000, 0); 
        doc.addImage(logo, 'PNG', 98, 4, 17, 10)

        doc.setFontSize('18')
        doc.setTextColor(255,255,255);
        doc.setFont('Helvertica', 'bold')
        doc.text("Event Report", 86, 20)
        //
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'Normal')
        doc.text("Report generated on: ", 68, 27)
        doc.setFontSize('12')
        doc.setFont('Helvertica', 'bold')
        doc.text(new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString('en-US'), 105, 27)

        doc.setTextColor(0,0,0);
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Location ", 14, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + room, 45, 47)
        
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'bold')
        // doc.text("Reservation ID ", 124, 47)
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'Normal')
        // doc.text(":  " + roomId, 151, 47)

        // doc.setTextColor(0,0,0);
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'bold')
        // doc.text("Address ", 14, 55)
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'Normal')
        // doc.text(":  " + roomDetails.addressLine1 + ", " + roomDetails.addressLne2 + ", " + roomDetails.city, 45, 55)
        
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'bold')
        // doc.text("Mobile ", 124, 55)
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'Normal')
        // doc.text(":  " + roomDetails.phoneNumber, 151, 55)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Payments", 14, 55)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + reportList.length, 45, 55)

        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'bold')
        // doc.text("Joined Date ", 124, 63)
        // doc.setFontSize('10')
        // doc.setFont('Helvertica', 'Normal')
        // doc.text(": " + roomDetails.joinedDate, 151, 63)
        
        doc.autoTable({
            theme: "grid",
            head: [['Customer Name', 'Mobile Number', 'Total Count', 'Date', 'Time']],
            body: reportList.map(col => [[col.customerName], [col.phoneNumber], [col.totalCount], [col.date], [col.time]]),
            margin: { top: 65 }
        })
        doc.save('EventReport' + room +'(' + new Date().toISOString().substring(0, 10) + " " + new Date().toLocaleTimeString('en-US') + ').pdf')
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
								Event Management
							</h1>

						</div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body mt-3 mb-2" style={{ margin: "0px" }} >
                                    <div class="row mb-2 px-4">
                                        <h5 class="fw-semibold">Select a location to generate the report</h5>
                                    </div>

                                    <div class="row  align-items-center px-4 mb-2" >
                                        <div class="mb-3 col-md-6 mb-2 ml-2">
                                            <label for="type">Locations</label>
                                            <Select
                                                isClearable
                                                isSearchable
                                                options={locationArr}
                                                onChange={((e) => {setRoom(e.label); setRoomId(e.value)})}
                                            />
                                        </div>
                                        <div class="col-md-2 " >
                                            <button type="submit" class="btn  btn-primary " id="addCustomer" 
                                                style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff', marginLeft: 50 }} 
                                                onClick={() => appointmentReportGet()} 
                                            >Submit</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div>
                            {head === true ? (
                                <button class="btn  btn-primary" style={{ marginBottom: 25 }} onClick={() => downloadPDF()} >Download PDF</button>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        {head === true ? (
                            <div class="col-12">
                                <div class="card">

                                    <div class="card-body">

                                        <table id="example" class="table table-striped my">

                                            <thead>
                                                <tr>
                                                    <th class="text-start">Customer Name</th>
                                                    <th class="text-start">Mobile Number</th>
                                                    <th class="text-start">Total Count</th>
                                                    <th class="text-start">Date</th>
                                                    <th class="text-start">Time</th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {reportList.map((value, index) => {
                                                    return <tr key={index}  id="OrderId">
                                                        <td class="text-start">{value.customerName}</td>
                                                        <td class="text-start">{value.phoneNumber}</td>
                                                        <td class="text-start">{value.totalCount}</td>
                                                        <td class="text-start">{value.date}</td>
                                                        <td class="text-start">{value.time}</td>
                                                    </tr>
                                                })}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p></p>
                        )}

					</div>
				</main>
			</div>
		</div>
	)

}

