import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

// Controllers


export default function Reservation_Dashboard() {

	return (

		<div class="wrapper" style={{backgroundColor: 'transaprent'}}>

			<Navbar />

			<div class="main" style={{backgroundColor: '#D3D3D3'}}>

				{/* top nav */}

				<main class="content mt-3">
					<div class="container-fluid">

						<div class="header">
							<h1 class="header-title mt-1">
								Analytics Overview
							</h1>

						</div>

						<div class="row">
							<div class="col-md-6 col-lg-3 col-xl">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">Customers</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
													<i class="align-middle fas fa-fw fa-users"></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">15</h1>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3 col-xl">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">All Appointment</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-bookmark"></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">54</h1>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3 col-xl">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">Pending Appointment</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-clock" ></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">12</h1>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3 col-xl">

								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">Active Appointment</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-check-circle" ></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">45</h1>
									</div>
								</div>
							</div>
						</div>


						<div class="row">
							<div class="col-md-6 col-lg-3 col-xl">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">Done Appointment</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-check" ></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">36</h1>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3 col-xl">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">Cancel Appointment</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-exclamation" ></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">23</h1>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3 col-xl">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title">Vehicle Booking</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-bold" ></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3">3</h1>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-3 col-xl">

								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="col mt-0">
												<h5 class="card-title"> Date</h5>
											</div>

											<div class="col-auto">
												<div class="avatar">
													<div class="avatar-title rounded-circle bg-primary-dark">
														<i class="align-middle fas fa-fw fa-calendar-alt"></i>
													</div>
												</div>
											</div>
										</div>
										<h1 class="display-5 mt-1 mb-3 " >2022-09-25</h1>
									</div>
								</div>
							</div>
						</div>












					</div>
				</main>



			</div>

		</div>


	)

}

