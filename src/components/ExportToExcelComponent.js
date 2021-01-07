import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

function ExportToExcelComponent({ spentAndReceivedAmountDetails }) {
  spentAndReceivedAmountDetails.sort((x, y) => x.uniqueKey - y.uniqueKey);

  let keys = ["Time", "Date", "Name", "Amount", "Received / Spent"];
  let values = spentAndReceivedAmountDetails.map((item) =>
    Object.values(item).slice(1)
  );

  let Results = [keys, ...values];

  function exportCSV() {
    var CsvString = "";
    Results.forEach(function (RowItem) {
      RowItem.forEach(function (ColItem) {
        CsvString += ColItem + ",";
      });
      CsvString += "\r\n";
    });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", "Expense_Tracker.csv");
    document.body.appendChild(x);
    x.click();
  }

  return (
    <>
      {spentAndReceivedAmountDetails.length !== 0 && (
        <button className="btn btn-success  mb-3" onClick={exportCSV}>
          <FontAwesomeIcon icon={faFileExcel} /> Export To Excel{" "}
        </button>
      )}
    </>
  );
}

export default ExportToExcelComponent;
