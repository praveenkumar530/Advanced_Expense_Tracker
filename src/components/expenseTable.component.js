import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function ExpenseTableComponent({
  tempSpentAndReceivedAmountDetails,
  deleteButtonClickHandler,
  handleDisplayTableOption,
  displayOption,
  editButtonClickHandler,
}) {
  const [open, setOpen] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(0);
  const [itemName, setItemName] = useState("");

  const handleClickOpen = (deletableUniqueKey) => {
    console.log(deletableUniqueKey);
    setOpen(true);
    let deletableItem = tempSpentAndReceivedAmountDetails.filter(
      (item) => item.uniqueKey === deletableUniqueKey
    )[0];
    setItemName(
      `Are you sure?  ${deletableItem.receivedOrSpentName} will be deleted!`
    );
    setUniqueKey(deletableUniqueKey);
  };

  const handleClose = (x) => {
    setOpen(false);
  };

  const handleOkay = (x) => {
    setOpen(false);
    deleteButtonClickHandler(uniqueKey);
  };

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
                  onClick={() => editButtonClickHandler(item.uniqueKey)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                  type="button"
                  className="btn1 btn-danger"
                  onClick={() => handleClickOpen(item.uniqueKey)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "WindowFrame",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent>
          <DialogContentText> {itemName}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay} variant="outlined" color="secondary">
            Okay
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExpenseTableComponent;
