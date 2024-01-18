// Table.js
import React from 'react';
import './Table.css'; // Import the CSS file

const Table = ({ data }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Number Plate</th>
          <th>Entry Time</th>
          <th>Exit Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.entry}</td>
            <td>{row.exit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
