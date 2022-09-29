import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";

import {getSelectedVehicle} from '../../controllers/vehicle'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function ViewVehicle() {

    const { id } = useParams();

    const [vehicleData, setVehicleData] = useState({});
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        getSelectedVehicle(id).then((result) => {
            console.log(result);
            setVehicleData(result);
            setIsAvailable(result.isAvailable);
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
								Vehicle Management
							</h1>

						</div>

						<div class="col-md-12">
                        <div class="card">
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/vehicleList"}
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
												<th>Vehicle Number</th>
												<td>{vehicleData.number}</td>
											</tr>
											<tr>
												<th>Vehicle Type</th>
												<td>{vehicleData.type}</td>
											</tr>
											<tr>
												<th>Number of Seats</th>
												<td>{vehicleData.numOfSeats}</td>
											</tr>
                                            <tr>
												<th>Driver</th>
												<td>{vehicleData.driver}</td>
											</tr>
                                            <tr>
												<th>Price per KM</th>
												<td>{vehicleData.pricePerKM}</td>
											</tr>
											<tr>
												<th>Availability</th>
												<td>{isAvailable ? "Available" : "Not Available"}</td>
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

