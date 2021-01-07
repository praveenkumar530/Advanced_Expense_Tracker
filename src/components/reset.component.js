import React from "react";

function ResetComponent({
  resetExpensesHandler,
  tempSpentAndReceivedAmountDetails,
  displayOption,
}) {
  if (tempSpentAndReceivedAmountDetails.length !== 0) {
    let message = "Clear All";
    if (displayOption === "spent") {
      message += " Spent Items";
    } else if (displayOption === "received") {
      message += " Received Items";
    }
    return (
      <div>
        <button className="btn btn-danger mb-3" onClick={resetExpensesHandler}>
          {message}
        </button>
      </div>
    );
  }
  return <div></div>;
}

export default ResetComponent;
