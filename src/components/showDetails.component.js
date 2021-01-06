import React from "react";
import CountUp from "react-countup";

function ShowDetailsComponent({ totalReceived, totalSpent, remaining }) {
  totalReceived = parseInt(totalReceived);
  totalSpent = parseInt(totalSpent);
  remaining = parseInt(remaining);

  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center  mb-1">
        Total Received Amount
        <span className="badge badge-success badge-pill show-badge">
          <CountUp
            start={(1 + totalReceived) / 2}
            end={totalReceived}
            duration={2}
          />
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center  mb-1">
        Total Spent Amount
        <span className="badge badge-danger badge-pill show-badge">
          <CountUp start={(1 + totalSpent) / 2} end={totalSpent} duration={2} />
        </span>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center ">
        Remaining Amount
        <span className="badge badge-primary badge-pill show-badge">
          <CountUp start={(1 + remaining) / 2} end={remaining} duration={2} />
        </span>
      </li>
    </ul>
  );
}

export default ShowDetailsComponent;
