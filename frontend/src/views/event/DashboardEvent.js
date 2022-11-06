import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";
import swal from "sweetalert";
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Line , PolarArea, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 

import {getCurrentReservations, getSelectedReservation} from '../../controllers/reservation.js';
import {getEventsForAMonth, getEventList} from '../../controllers/event.js';
import {getAllRooms} from "../../controllers/room.js";

import Navbar from '../../components/Reservation_Navbar';
import '../../css/modern.css';
import '../../js/app.js';

import logo from '../../img/logo/logo.png';
import orderFood from "../../img/icons/fmOrderFood.png";
import ordersImage from "../../img/icons/fmOrders.png";
import moneyImage from "../../img/icons/fmMoney.png";
import foodsImage from "../../img/icons/fmFoods.png";
import dietImage from '../../img/icons/fmDiet.png'
import beverageImage from '../../img/icons/fmBeverages.png'
import desertImage from '../../img/icons/fmCake.png';
import boxImage from '../../img/icons/fmBox.png';
import fastFoodImage from '../../img/icons/fmFastfood.png';

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function DashboardEvent() {

    const navigate = useNavigate();

    const [monthName, setMonthName] = useState("");
    const [month, setMonth] = useState(0);

    const [foodCount, setFoodCount] = useState(3);
    const [orderCount, setOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [revenueList, setRevenueList] = useState([]);

    useEffect(() => {
        const nameOfMonth = new Date().toLocaleString('default', {
            month: 'long',
        });
        setMonthName(nameOfMonth)
        let month = new Date().getMonth() + 1;
        setMonth(month)
        setFoodCount(3);
        getEventsForAMonth(month).then((res) => {
            if (res.length < 10) {
                setOrderCount("0" + res.length)
            } else 
                setOrderCount(res.length)
        })
        getAllRooms().then((res) => {
            if (res.length < 10) {
                setRevenue("0" + res.length)
            } else 
                setRevenue(res.length)
        })
        getEventList().then((res) => {
            setRevenueList(res);
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
    }, [])

    // const getRoomDetails = async(id) => {
    //     await getSelectedReservation(id).then((res) => {
    //         setRoomDetails(res);
    //         // console.log(res);
    //         // console.log("ssssssssssssss")
    //     })
    // }

    const onMakeOrder = () => {
        navigate("/addEvent");
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
								Event Management
							</h1>

						</div>

                        <div class="col-md-12" >
                            <div class="card" style={{marginRight: "40px"}}>
                                <div class="card-body mt-3" style={{ margin: "0px" }}>
                                <div class="row">
                                    <div class="col-md-7 px-5">
                                    <div class="row fs-2">
                                        <h3 class="mb-2">Hello Kaumadi Onel!</h3>
                                    </div>
                                    <div class="row fs-6">
                                        <h5 class="mb-0">Event Manager</h5>
                                    </div>
                                    <div class="row">
                                        <p class="mb-2">Login Time: 06:56pm </p>
                                    </div>
                                    <div class="row">
                                        <a href="/">
                                        <p class="mb-2">Logout</p>
                                        </a>
                                    </div>
                                    </div>
                                    <div class="col-md-5">
                                    <div class="row m-3 h-75">
                                        <a>
                                        <div class="container-12 mx-6 d-flex justify-content-center align-items-center h-100 rounded" 
                                        style={{ backgroundColor: "#2E4765" }} onClick={onMakeOrder} id="makeOrder">
                                            <div class="col-3">
                                            <img src={orderFood} class="img-fluid mx-3"></img>
                                            </div>
                                            <div class="col-6 mx-3 d-flex justify-content-center align-items-center fw-semibold fs-4 px-3 text-white">
                                            <p>Make an Event</p>
                                            </div>
                                        </div>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>


                        <div class="row d-flex justify-content-between">
                            <div class="col-md-6 col-lg-4 ">
                                <div class="card" style={{ width: "350px", backgroundColor: "#518B6C" }}>
                                <div class="card-body" style={{ margin: "0px" }}>
                                    <div class="row">
                                    <div class="col-6 mt-0 px-4 text-white">
                                        <h5 class="card-title text-white fs-5">Locations</h5>
                                        <h1 class="display-5 mt-1 mb-1 text-white fw-bold" style={{ fontSize: "40px" }}>{"0" + foodCount}</h1>
                                        <h5 class="text-white fs-5">{monthName}</h5>
                                    </div>

                                    <div class="col-5 mx-2">
                                        <img src={ordersImage} class="img-fluid mx-3"></img>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 ">
                                <div
                                class="card"
                                style={{ width: "350px", backgroundColor: "#C49C2C" }}
                                >
                                <div class="card-body" style={{ margin: "0px" }}>
                                    <div class="row">
                                    <div class="col-6 mt-0 px-4 text-white">
                                        <h5 class="card-title text-white fs-5">Total Events</h5>
                                        <h1 class="display-5 mt-1 mb-1 text-white fw-bold" style={{ fontSize: "40px" }}>
                                        {orderCount}
                                        </h1>
                                        <h5 class="text-white fs-5">{monthName}</h5>
                                    </div>

                                    <div class="col-5 mx-2">
                                        <img src={moneyImage} class="img-fluid mx-3"></img>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 ">
                                <div
                                class="card"
                                style={{ width: "350px", backgroundColor: "#D86F33" }}
                                >
                                <div class="card-body" style={{ margin: "0px" }}>
                                    <div class="row">
                                    <div class="col-6 mt-0 px-4 text-white">
                                        <h5 class="card-title text-white fs-5">Total Rooms</h5>
                                        <h1 class="display-5 mt-1 mb-1 text-white fw-bold" style={{ fontSize: "40px" }}>
                                        {revenue}
                                        </h1>
                                        <h5 class="text-white fs-5">{monthName}</h5>
                                    </div>

                                    <div class="col-5 mx-2">
                                        <img src={foodsImage} class="img-fluid mx-3"></img>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        


                        <div class="row d-flex justify-content-center mt-4">
                            <div class="col-md-6 col-lg-9 ">
                                <div class="card">
                                    <div class="card-body" style={{ margin: "0px" }}>

                                        <Bar
                                            datasetIdKey='id'
                                            data={{
                                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 'Jul', 'Aug', "Sept", "Oct", "Nov", "Dec"],
                                                datasets: [{
                                                    label: 'Annual Events Summary',
                                                    data: revenueList,
                                                    backgroundColor: [
                                                        'rgb(255, 99, 132)',
                                                        'rgb(75, 192, 192)',
                                                        'rgb(255, 205, 86)',
                                                        'rgb(201, 203, 207)',
                                                        'rgb(54, 162, 235)',
                                                        'rgb( 80, 175, 52 )',
                                                        'rgb( 153, 97, 217 )',
                                                        'rgb(  189, 81, 153 )',
                                                        'rgb(  159, 183, 63 )'
                                                    ]
                                                }]
                                            }}
                                        />


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

