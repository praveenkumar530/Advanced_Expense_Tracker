import React from "react";

function ResetComponent({
  resetExpensesHandler,
  tempSpentAndReceivedAmountDetails,
  displayOption,
}) {
  if (tempSpentAndReceivedAmountDetails.length !== 0) {
    return (
      <button
        className="btn btn-danger mb-5"
        onClick={resetExpensesHandler}
        disabled={displayOption !== "all"}
      >
        Clear All
      </button>
    );
  }
  return <div></div>;
}

export default ResetComponent;
