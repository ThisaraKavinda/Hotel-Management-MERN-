import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import single from '../../img/photos/single.jpg';
import double from '../../img/photos/double.jpg';
import triple from '../../img/photos/triple.jpg';
import queen from '../../img/photos/queen.jpg';
import presidential from '../../img/photos/presidential.jpg';

import {getSelectedReservation} from '../../controllers/reservation'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function ViewReservation() {

    const { id } = useParams();

    const [reservationData, setReservationData] = useState({});

    useEffect(() => {
        getSelectedReservation(id).then((result) => {
        console.log(result);
        setReservationData(result);
        });
    }, []);

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
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/reservationList"}
												class="top-bar-link px-5"
											>
												<button
												class="btn btn-pill btn-success btn-sm"
												style={{ marginLeft:-600, width: 60 }}
												>
												Back
												</button>
											</Link></center>
                                        
										{/* <div class="col-sm-3 col-xl-12 col-xxl-12 text-center">
											<img src={single} class=" mt-2" alt="Angelica Ramos" width="600" height="300"/>
										</div> */}
										<br></br>
                                        <br></br>
									</div>

                                    <div class="row">
                                                <div class="col-md-2"></div>
                                                <div class="col-md-8"><table class="table table-sm my-2 " >
										<tbody>
											<tr>
												<th>Name</th>
												<td>{reservationData.name}</td>
											</tr>
											<tr>
												<th>NIC</th>
												<td>{reservationData.nic}</td>
											</tr>
											<tr>
												<th>Phone Number</th>
												<td>{reservationData.phoneNumber}</td>
											</tr>
											<tr>
												<th>Address</th>
												<td>{reservationData.addressLine1 + ", " + reservationData.addressLne2 + ", " + reservationData.city}</td>
											</tr>
											<tr>
												<th>State</th>
												<td>{reservationData.state}</td>
											</tr>
                                            <tr>
												<th>Zip Code</th>
												<td>{reservationData.zipCode}</td>
											</tr>
                                            <tr>
												<th>Email</th>
												<td>{reservationData.email}</td>
											</tr>
                                            <tr>
												<th>Check In Date</th>
												<td>{reservationData.checkInDate === undefined ? null : reservationData.checkInDate.substring(0,10)}</td>
											</tr>
                                            <tr>
												<th>Check Out Date</th>
												<td>{reservationData.checkOutDate === undefined ? null : reservationData.checkOutDate.substring(0,10)}</td>
											</tr>
                                            <tr>
												<th>Room Type</th>
												<td>{reservationData.roomType}</td>
											</tr>
                                            <tr>
												<th>Room</th>
												<td>{reservationData.room}</td>
											</tr>
                                            <tr>
												<th>Number of Adults</th>
												<td>{reservationData.numOfAdults}</td>
											</tr>
                                            <tr>
												<th>Number of Childers</th>
												<td>{reservationData.numOfChildren}</td>
											</tr>	
										</tbody>
									</table></div>
                                                <div class="col-md-2"></div>
                                            </div>


                                            <hr></hr>
                                            
									
								</div>
							</div>
                        </div>

					</div>
				</main>
			</div>
		</div>
	)

}

