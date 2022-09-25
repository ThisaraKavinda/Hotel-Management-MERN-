import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {getAllRooms, deleteRoom} from '../../controllers/room'

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

export default function RoomList() {

    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        getAllRooms().then((result) => {
            setRoomList(result);
        //initialize datatable
        $(document).ready(function () {
            $("#example").DataTable();
        });
        });
    }, []);

    function deleteMyRoom(id) {
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this room!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willDelete) => {
        if (willDelete) {
            deleteRoom(id).then((result) => {
            var employee = roomList.filter((e) => e._id !== result._id);
            setRoomList(employee);
            $(document).ready(function () {
                $("#example").DataTable();
            });
            });

            swal("Room has been deleted!", {
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
								Rooms Management
							</h1>

						</div>

                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="example" class="table table-striped my">
                                        <thead>
                                        <tr>
                                            <th>Room Code</th>
                                            <th>Type</th>
                                            <th>Price per day</th>
                                            <th>Availability</th>
                                            <th>A/C</th>
                                            <th >Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {roomList.map((value, index) => {
                                            return (
                                            <tr key={index}>
                                                <td>{value.name}</td>
                                                <td>{value.type}</td>
                                                <td>{value.price}</td>
                                                <td>{<Switch checked={value.isAvailable} />}</td>
                                                <td>{<Switch checked={value.isAc} />}</td>
                                                <td class="table-action">
                                                <button
                                                    class="btn btn-pill btn-danger btn-sm"
                                                    style={{ marginLeft: 45, width: 60 }}
                                                    onClick={() => deleteMyRoom(value._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={"/roomEdit/" + value._id}
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
                                                    to={"/viewRoom/" + value._id}
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

