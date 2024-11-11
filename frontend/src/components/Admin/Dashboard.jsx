import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement, // Import ArcElement for Doughnut charts
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { getAdminProduct } from "../../actions/productAction.jsx";

// Register Chart.js components (required for chart to render correctly)
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement, // Register ArcElement for Doughnut chart
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { order } = useSelector((state) => state.order);
  let outOfStock = 0;

  products &&
     products.forEach((item)=>{
      if(item.Stock === 0){
        outOfStock += 1;
      }
   })
   useEffect(() => {
    dispatch(getAdminProduct());
}, [dispatch, alert]);


  // Line chart data
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"], // X-axis labels
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, 4000],
        borderColor: "tomato",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "tomato",
        pointBorderColor: "#fff",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Doughnut chart data
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs.: 2000
            </p>
          </div>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length }</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{order && order.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>2</p>
          </Link>
        </div>

        <div className="lineChart">
          <Line data={lineState} /> {/* Render the Line chart */}
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} /> {/* Render the Doughnut chart */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
