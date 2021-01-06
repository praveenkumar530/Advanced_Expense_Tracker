import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function ExpenseTableComponent({
  tempSpentAndReceivedAmountDetails,
  deleteButtonClickHandler,
  handleDisplayTableOption,
  displayOption,
  editButtonClickHandler,
}) {
  return (
    <div>
      <div
        className="m-2 d-flex justify-content-around align-items-center orange-border border-radius  mt-3"
        onChange={handleDisplayTableOption}
      >
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio11"
            readOnly
            value="all"
            checked={displayOption === "all"}
          />
          <label className="form-check-label" htmlFor="inlineRadio11">
            All
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input "
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio22"
            value="received"
            readOnly
            checked={displayOption === "received"}
          />
          <label className="form-check-label" htmlFor="inlineRadio22">
            Received
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="spent"
            readOnly
            checked={displayOption === "spent"}
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Spent
          </label>
        </div>
      </div>

      {tempSpentAndReceivedAmountDetails.length === 0 ? (
        <h6 className="no-items"> No items to display</h6>
      ) : (
        ""
      )}

      {/* table+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
      <table
        className="table table-sm mt-2"
        hidden={tempSpentAndReceivedAmountDetails.length === 0}
      >
        <thead>
          <tr>
            <th scope="col" className="w-26">
              Name
            </th>
            <th scope="col" className="w-22">
              Amount
            </th>
            <th scope="col" className="w-35">
              Date
            </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tempSpentAndReceivedAmountDetails.map((item) => (
            <tr
              key={item.uniqueKey}
              className={
                item.spentOrReceived === "spent"
                  ? "table-danger"
                  : "table-success"
              }
            >
              <td>{item.receivedOrSpentName} </td>
              <td>{item.amount} </td>
              <td>
                <span className=" badge badge-pill  badge-info">
                  {item.dateField}
                </span>
                <br /> <small>{item.strTime}</small>
              </td>
              <td>
                <button
                  type="button"
                  className="btn1 btn-warning mr-2"
                  onClick={() =>
                    editButtonClickHandler(item.uniqueKey)
                  }
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  type="button"
                  className="btn1 btn-danger"
                  onClick={() => deleteButtonClickHandler(item.uniqueKey)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTableComponent;
