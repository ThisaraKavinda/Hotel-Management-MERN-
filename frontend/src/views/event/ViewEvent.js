import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {getSelectedEvent} from '../../controllers/event'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function ViewEvent() {

    const { id } = useParams();

    const [eventData, setEventData] = useState({});

    useEffect(() => {
        getSelectedEvent(id).then((result) => {
        console.log(result);
        setEventData(result);
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
								Events Management
							</h1>

						</div>

						<div class="col-md-12">
                        <div class="card">
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/eventList"}
												class="top-bar-link"
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
												<th>Customer Name</th>
												<td>{eventData.customerName}</td>
											</tr>
											<tr>
												<th>Phone Number</th>
												<td>{eventData.phoneNumber}</td>
											</tr>
											<tr>
												<th>Address</th>
												<td>{eventData.address}</td>
											</tr>
											<tr>
												<th>Type</th>
												<td>{eventData.type}</td>
											</tr>
											<tr>
												<th>Total Count</th>
												<td>{eventData.totalCount}</td>
											</tr>
											<tr>
												<th>Location</th>
												<td>{eventData.locationType}</td>
											</tr>
											<tr>
												<th>Date</th>
												<td>{eventData.date}</td>
											</tr>
											<tr>
												<th>Time</th>
												<td>{eventData.time}</td>
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

