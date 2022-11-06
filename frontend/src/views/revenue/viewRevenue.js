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

import {getSelectedPayment} from '../../controllers/payment'
import {viewRevenue} from '../../controllers/revenue'

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

export default function ViewRevenue() {

    const { id } = useParams();

    const [paymentData, setPaymentData] = useState({});

    useEffect(() => {
        viewRevenue(id).then((result) => {
        console.log(result);
        setPaymentData(result);
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
								Revenue Management
							</h1>

						</div>

						<div class="col-md-12">
                        <div class="card">
								<div class="card-body">
                                    
									<div class="column" >
									<center><Link
												to={"/revenueList"}
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
												<td>{paymentData.customerName}</td>
											</tr>
											<tr>
												<th>Phone Number</th>
												<td>{paymentData.phoneNumber}</td>
											</tr>
                                            <tr>
												<th>Date</th>
												<td>{paymentData.date}</td>
											</tr>
											<tr>
												<th>Time</th>
												<td>{paymentData.time}</td>
											</tr>
											<tr>
												<th>Type</th>
												<td>{paymentData.type}</td>
											</tr>
											<tr>
												<th>Amount</th>
												<td>{paymentData.price}</td>
											</tr>
                                            <tr>
												<th>Details</th>
												<td>{paymentData.details}</td>
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

