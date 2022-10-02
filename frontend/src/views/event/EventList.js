import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {getAllEvents, deleteEvent} from '../../controllers/event'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function EventList() {

    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        getAllEvents().then((result) => {
            setEventList(result);
        //initialize datatable
        $(document).ready(function () {
            $("#example").DataTable();
        });
        });
    }, []);

    function deleteMyEvent(id) {
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this event!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willDelete) => {
        if (willDelete) {
            deleteEvent(id).then((result) => {
            var event = eventList.filter((e) => e._id !== result._id);
            setEventList(event);
            $(document).ready(function () {
                $("#example").DataTable();
            });
            });

            swal("Event has been deleted!", {
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
								Events Management
							</h1>

						</div>

                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="example" class="table table-striped my">
                                        <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Phone Number</th>
                                            <th>Type</th>
                                            <th>Location</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th >Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {eventList.map((value, index) => {
                                            return (
                                            <tr key={index}>
                                                <td>{value.customerName}</td>
                                                <td>{value.phoneNumber}</td>
                                                <td>{value.type}</td>
                                                <td>{value.locationType}</td>
                                                <td>{value.date}</td>
                                                <td>{value.time}</td>
                                                <td class="table-action">
                                                <button
                                                    class="btn btn-pill btn-danger btn-sm"
                                                    style={{ marginLeft: 45, width: 60 }}
                                                    onClick={() => deleteMyEvent(value._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={"/editEvent/" + value._id}
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
                                                    to={"/viewEvent/" + value._id}
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

