import React from "react";

function ShowDetailsComponent({ totalReceived, totalSpent, remaining }) {
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center rounded mb-1">
        Total Received Amount
        <span className="badge badge-primary badge-pill">{totalReceived}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center rounded mb-1">
        Total Spent Amount
        <span className="badge badge-primary badge-pill">{totalSpent}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center rounded">
        Remaining Amount
        <span className="badge badge-primary badge-pill">{remaining}</span>
      </li>
    </ul>
  );
}

export default ShowDetailsComponent;
