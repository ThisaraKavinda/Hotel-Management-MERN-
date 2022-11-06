import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {getAllPayments, deletePayment} from '../../controllers/payment';
import {getAllFeedbacks, deleteFeedBack} from '../../controllers/feedback';

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

export default function FeedbackList() {

    const [paymentList, setPaymentList] = useState([]);

    useEffect(() => {
        getAllFeedbacks().then((result) => {
            setPaymentList(result);
        //initialize datatable
        $(document).ready(function () {
            $("#example").DataTable();
        });
        });
    }, []);

    function deleteMyPayment(id) {
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this payment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willDelete) => {
        if (willDelete) {
            deleteFeedBack(id).then((result) => {
            var payment = paymentList.filter((e) => e._id !== result._id);
            setPaymentList(payment);
            $(document).ready(function () {
                $("#example").DataTable();
            });
            });

            swal("Feedback has been deleted!", {
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
								Feedback Management
							</h1>

						</div>

                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <table id="example" class="table table-striped my">
                                        <thead>
                                        <tr>
                                            <th>Room Code</th>
                                            <th>Name</th>
                                            <th>Phone Number</th>
                                            <th>CheckIn Date</th>
                                            <th>CheckOut Date</th>
                                            <th>Email</th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {paymentList.map((value, index) => {
                                            return (
                                            <tr key={index}>
                                                <td>{value.roomno}</td>
                                                <td>{value.name}</td>
                                                <td>{value.phoneNumber}</td>
                                                <td>{value.checkInDate}</td>
                                                <td>{value.checkOutDate}</td>
                                                <td>{value.email}</td>
                                                
                                                <td class="table-action">
                                                <button
                                                    class="btn btn-pill btn-danger btn-sm"
                                                    style={{ marginLeft: 45, width: 60 }}
                                                    onClick={() => deleteMyPayment(value._id)}
                                                >
                                                    Delete
                                                </button>
                                                <Link
                                                    to={"/editFeedback/" + value._id}
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
                                                    to={"/viewFeedback/" + value._id}
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

