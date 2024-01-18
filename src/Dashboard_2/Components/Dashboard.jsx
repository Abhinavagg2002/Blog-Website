import React from "react";
import "../Css/Components/Dashboard.css";
import TotalBusiness from "./MainDashboard";
import Table from "./Table/Table";
import PieChart from "./Dashboard_2/PieChart";
const Dashboard = () => {

  const tableData = [
    {date: 'HR70C1095', entry: '5:30', exit: '6:00'}
    // Add more data rows as needed
  ];

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="grid">
          <div className="one">
            <TotalBusiness />
          </div>
          <PieChart/>
          <br></br>
          <div className="two">
            <h1>Parking Table Data</h1>
            <Table data={tableData} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
