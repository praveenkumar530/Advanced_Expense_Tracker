import React from "react";

function InputFormComponent({
  receivedOrSpentName,
  amount,
  handleReceivedOrSpentName,
  handleamount,
  handleSpentOrReceived,
  submitFormHandler,
}) {
  return (
    <form onSubmit={submitFormHandler} className="pt-3">
      <div className="form-row mb-2">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Received/spent name"
            value={receivedOrSpentName}
            onChange={handleReceivedOrSpentName}
            autoComplete="off"
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Amount.."
            value={amount}
            onChange={handleamount}
            autoComplete="off"
            pattern="[0-9]*"
            required
          />
        </div>
      </div>
      <div onChange={handleSpentOrReceived}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="spent"
            defaultChecked 
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Spent
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="received"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Received
          </label>
        </div>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </div>
    </form>
  );
}

export default InputFormComponent;
