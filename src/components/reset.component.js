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
      <button className="btn btn-danger mb-5" onClick={resetExpensesHandler}>
        {message}
      </button>
    );
  }
  return <div></div>;
}

export default ResetComponent;
