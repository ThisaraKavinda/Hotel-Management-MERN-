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

import {getSelectedRoom, editRoom} from '../../controllers/room'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function ViewRoom() {

    const { id } = useParams();

    const [roomData, setRoomData] = useState({});
    const [isAvailable, setIsAvailable] = useState(false);
    const [isAc, setIsAc] = useState(false);
    const [type, setType] = useState("");

    useEffect(() => {
        getSelectedRoom(id).then((result) => {
        console.log(result);
        setRoomData(result);
        setIsAvailable(result.isAvailable);
        setIsAc(result.isAc);
        setType(result.type);
        });
    }, []);

    const roomTypes = [
        { value: 'Single', label: 'Single' },
        { value: 'Double', label: 'Double' },
        { value: 'Triple', label: 'Triple' },
        { value: 'Queen', label: 'Queen' },
        { value: 'Executive ', label: 'Executive' }
    ]

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

						<div class="col-md-12">
                        <div class="card">
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/roomList"}
												class="top-bar-link"
											>
												<button
												class="btn btn-pill btn-success btn-sm"
												style={{ marginLeft:-600, width: 60 }}
												>
												Back
												</button>
											</Link></center>
                                        
										<div class="col-sm-3 col-xl-12 col-xxl-12 text-center">
											<img src={single} class=" mt-2" alt="Angelica Ramos" width="600" height="300"/>
										</div>
										<br></br>
                                        <br></br>
									</div>

                                    <div class="row">
                                                <div class="col-md-2"></div>
                                                <div class="col-md-8"><table class="table table-sm my-2 " >
										<tbody>
											<tr>
												<th>Room Code</th>
												<td>{roomData.name}</td>
											</tr>
											<tr>
												<th>Type</th>
												<td>{roomData.type}</td>
											</tr>
											<tr>
												<th>Price</th>
												<td>{roomData.price}</td>
											</tr>
											<tr>
												<th>Availability</th>
												<td>{isAvailable ? "Available" : "Not Available"}</td>
											</tr>
											<tr>
												<th>Air Conditioned</th>
												<td>{isAc ? "Air Conditioned" : "Not Air Conditioned"}</td>
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

