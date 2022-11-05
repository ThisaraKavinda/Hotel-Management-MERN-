import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import {getAllReservations, deleteReservation, getReservationsInAGivenPeriod} from '../../controllers/reservation';

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

export default function ReportReservation() {

    $("input").on("change", function () {
        this.setAttribute(
            "data-date",
            moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
        )
    }).trigger("change")

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate() + 1;
    let year = dateObj.getUTCFullYear()
    let prevMonth = month - 3;
    if (month < 10)
        month = "0" + month;
    if (prevMonth < 10)
        prevMonth = "0" + prevMonth;
    if (day < 10)
        day = "0" + day;
    let initalStartDate = year + "-" + prevMonth + "-" + day;
    let initalEndDate = year + "-" + month + "-" + day;

    const [reservationList, setReservationList] = useState([]);
    const [startDate, setStartDate] = useState(initalStartDate);
    const [endDate, setEndDate] = useState(initalEndDate);

    const [loading, setLoading] = useState(true);

    const [reportList, setReportList] = useState([]);
    const [head, setHead] = useState(true);

    useEffect(() => {
        getAllReservations().then((result) => {
            setReservationList(result);
        //initialize datatable
        $(document).ready(function () {
            $("#example").DataTable();
        });
        });
    }, []);

    async function appointmentReportGet() {
        await setLoading(true);
        if (startDate === '') {
            swal("Start date not selected");
        } else if (endDate === '') {
            swal("End date not selected");
        } else {
            setLoading(true);
            getReservationsInAGivenPeriod(startDate, endDate).then((result) => {
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
        doc.setDrawColor(8, 30, 61);
        doc.setLineWidth(70);    
        doc.line(0, 0, 1000, 0); 
        doc.addImage(logo, 'PNG', 85, 4, 40, 10)

        doc.setFontSize('18')
        doc.setTextColor(255,255,255);
        doc.setFont('Helvertica', 'bold')
        doc.text("Food & Beverage Orders Report", 63, 20)
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
        doc.text("Report Start Date ", 14, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + startDate, 45, 47)
        
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Report End Date ", 147, 47)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + endDate, 176, 47)

        doc.setFontSize('10')
        doc.setFont('Helvertica', 'bold')
        doc.text("Total Orders", 14, 55)
        doc.setFontSize('10')
        doc.setFont('Helvertica', 'Normal')
        doc.text(":  " + reportList.length, 45, 55)
        
        doc.autoTable({
            theme: "grid",
            head: [['Reservation Id', 'NIC', 'Item count', 'Date', 'Time', 'Total Price']],
            body: reportList.map(col => [[col.reservationId], [col.nic], [col.count], [col.date], [col.time], ["Rs. " + col.totalPrice + ".00"]]),
            margin: { top: 65 }
        })
        doc.save('FoodOrderReport(' + startDate + '-' + endDate + ').pdf')
    }

    function deleteMyReservation(id) {
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this reservation!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willDelete) => {
        if (willDelete) {
            deleteReservation(id).then((result) => {
            var reservations = reservationList.filter((e) => e._id !== result._id);
            setReservationList(reservations);
            $(document).ready(function () {
                $("#example").DataTable();
            });
            });

            swal("Reservation has been deleted!", {
            icon: "success",
            title: "Delete Successfully!",
            buttons: false,
            timer: 2000,
            });
        }
        });
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
								Reservation Management
							</h1>

						</div>

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body mt-3 mb-2" style={{ margin: "0px" }} >
                                    <div class="row mb-2 px-4">
                                        <h5 class="fw-semibold">Select the Start date, End date and Room to generate the report</h5>
                                    </div>

                                    <div class="row  align-items-center px-4 mb-2" >
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">Start Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={startDate} 
                                            onChange={(e) => setStartDate(e.target.value)} defaultValue={initalStartDate} required />
                                        </div>
                                        <div class="mb-3 col-md-5">
                                            <label for="inputEmail4">End Date</label>
                                            <input type="date" class="form-control" name="appointment" data-date-format="DD MMMM YYYY" value={endDate} 
                                            onChange={(e) => setEndDate(e.target.value)} defaultValue={initalEndDate} required />
                                        </div>
                                        <div class="col-md-2 " >
                                            <button type="submit" class="btn  btn-primary " id="addCustomer" style={{ backgroundColor: '#081E3D', borderColor: '#081E3D', color: '#fff', marginLeft: 50 }} onClick={() => appointmentReportGet()} >Submit</button>
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

                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="example" class="table table-striped my">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>Check In Date</th>
                                            <th>Check Out Date</th>
                                            <th>Room</th>
                                            <th >Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {reservationList.map((value, index) => {
                                            return (
                                            <tr key={index}>
                                                <td>{value.name}</td>
                                                <td>{value.phoneNumber}</td>
                                                <td>{value.checkInDate.substring(0,10)}</td>
                                                <td>{value.checkOutDate.substring(0,10)}</td>
                                                <td>{value.room}</td>
                                                <td class="table-action">
                                                <button
                                                    class="btn btn-pill btn-danger btn-sm"
                                                    style={{ marginLeft: 45, width: 60 }}
                                                    onClick={() => deleteMyReservation(value._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={"/editReservation/" + value._id}
                                                    class="top-bar-link"
                                                >
                                                    <button
                                                    class="btn btn-pill btn-success btn-sm"
                                                    style={{ marginLeft: 10, width: 60 }}
                                                    >
                                                    Edit
                                                    </button>
                                                </Link>
                                                <Link
                                                    to={"/viewReservation/" + value._id}
                                                    class="top-bar-link"
                                                >
                                                    <button
                                                    class="btn btn-pill btn-success btn-sm"
                                                    style={{ marginLeft: 10, width: 60 }}
                                                    >
                                                    View
                                                    </button>
                                                </Link>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>

					</div>
				</main>
			</div>
		</div>
	)

}

