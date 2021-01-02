import "./App.css";
import { useState, useEffect } from "react";
import HeaderComponent from "./components/header.component";
import InputFormComponent from "./components/inputform.component";
import ShowDetailsComponent from "./components/showDetails.component";
import ResetComponent from "./components/reset.component";
import SpentOrReceivedTableComponent from "./components/expenseTable.component";
import {
  getLsincomeArray,
  getLsspentArray,
  getLsspentAndReceivedAmountDetails,
} from "./localStorage";

function App() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [receivedOrSpentName, setReceivedOrSpentName] = useState("");
  const [amount, setAmount] = useState("");
  const [spentOrReceived, setspentOrReceived] = useState("spent");
  const [
    spentAndReceivedAmountDetails,
    setSpentAndReceivedAmountDetails,
  ] = useState(getLsspentAndReceivedAmountDetails);

  const [
    tempSpentAndReceivedAmountDetails,
    setTempSpentAndReceivedAmountDetails,
  ] = useState(getLsspentAndReceivedAmountDetails);

  const [totalReceived, setTotalReceived] = useState(1000);
  const [totalSpent, setTotalSpent] = useState(123);
  const [remaining, setRemaining] = useState(0);
  const [incomeArray, setIncomeArray] = useState(getLsincomeArray);
  const [spentArray, setSpentArray] = useState(getLsspentArray);
  const [displayOption, setDisplayOption] = useState("all");

  function submitFormHandler(e) {
    setDisplayOption("all");
    //Add income or spent money to respective arrays
    if (spentOrReceived === "received") {
      let newincomeArray = [...incomeArray, parseInt(amount)];
      setIncomeArray(newincomeArray);
      localStorage.setItem("incomeArray", JSON.stringify(newincomeArray));
    } else {
      let newspentArray = [...spentArray, parseInt(amount)];
      setSpentArray(newspentArray);
      localStorage.setItem("spentArray", JSON.stringify(newspentArray));
    }

    //Month and date calculation
    let today = new Date();
    let dateField = today.getDate() + "-" + months[today.getMonth()];

    //Time calculation
    var hours = today.getHours();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    var strTime = `(${hours}-${ampm})`;

    //Unique key for storing the data in rows
    let uniqueKey = Math.floor(
      window.performance.now() + window.performance.timeOrigin
    );
    let newExpenses = [
      ...spentAndReceivedAmountDetails,
      {
        uniqueKey,
        strTime,
        dateField,
        receivedOrSpentName,
        amount,
        spentOrReceived,
      },
    ];

    //Sorting all the expenses by descending order i.e wrt latest item
    newExpenses.sort((x, y) => y.uniqueKey - x.uniqueKey);

    setSpentAndReceivedAmountDetails(newExpenses);
    setTempSpentAndReceivedAmountDetails(newExpenses);

    //set the values to local storage
    localStorage.setItem(
      "spentAndReceivedAmountDetails",
      JSON.stringify(newExpenses)
    );

    e.preventDefault();
  }

  function handleReceivedOrSpentName(e) {
    setReceivedOrSpentName(e.target.value);
  }

  function handleamount(e) {
    setAmount(e.target.value);
  }

  function handleSpentOrReceived(e) {
    setspentOrReceived(e.target.value);
  }

  useEffect(
    function () {
      setReceivedOrSpentName("");
      setAmount("");

      let totalIncomeSum = incomeArray.reduce((x, y) => x + y, 0);
      let totalSpentSum = spentArray.reduce((x, y) => x + y, 0);
      let remainingMoney = totalIncomeSum - totalSpentSum;
      setTotalReceived(totalIncomeSum);
      setTotalSpent(totalSpentSum);
      setRemaining(remainingMoney);
    },
    [incomeArray, spentArray, tempSpentAndReceivedAmountDetails, displayOption]
  );

  function resetExpensesHandler() {
    if (window.confirm("Are you sure ? This will clear all the records !!")) {
      setReceivedOrSpentName("");
      setspentOrReceived("spent");
      setTotalReceived("");
      setTotalSpent("");
      setRemaining("");
      setAmount("");
      setTempSpentAndReceivedAmountDetails([]);

      if (displayOption === "received") {
        let newsetSpentAndReceivedAmountDetails = spentAndReceivedAmountDetails.filter(
          (item) => item.spentOrReceived !== "received"
        );
        setSpentAndReceivedAmountDetails(newsetSpentAndReceivedAmountDetails);
        setIncomeArray([]);
        setDisplayOption("received");
        localStorage.setItem(
          "spentAndReceivedAmountDetails",
          JSON.stringify(newsetSpentAndReceivedAmountDetails)
        );
        localStorage.setItem("incomeArray", []);
      } else if (displayOption === "spent") {
        let newsetSpentAndReceivedAmountDetails = spentAndReceivedAmountDetails.filter(
          (item) => item.spentOrReceived !== "spent"
        );
        setSpentAndReceivedAmountDetails(newsetSpentAndReceivedAmountDetails);
        setSpentArray([]);
        setDisplayOption("spent");
        //Empty values to local storage
        localStorage.setItem(
          "spentAndReceivedAmountDetails",
          JSON.stringify(newsetSpentAndReceivedAmountDetails)
        );
        localStorage.setItem("spentArray", []);
      } else {
        setSpentAndReceivedAmountDetails([]);
        setIncomeArray([]);
        setSpentArray([]);
        setDisplayOption("all");
        //Empty values to local storage
        localStorage.setItem("spentAndReceivedAmountDetails", []);
        localStorage.setItem("incomeArray", []);
        localStorage.setItem("spentArray", []);
      }
    }
  }

  function deleteButtonClickHandler(key) {
    let newSpentAndReceivedAmountDetails = spentAndReceivedAmountDetails.filter(
      (item) => item.uniqueKey !== key
    );

    let newincomeArray = newSpentAndReceivedAmountDetails
      .filter((item) => item.spentOrReceived === "received")
      .map((a) => parseInt(a.amount));
    setIncomeArray(newincomeArray);

    let newSpentArray = newSpentAndReceivedAmountDetails
      .filter((item) => item.spentOrReceived === "spent")
      .map((a) => parseInt(a.amount));
    setSpentArray(newSpentArray);

    setSpentAndReceivedAmountDetails(newSpentAndReceivedAmountDetails);
    updateNewDisplayArrayDetails(
      displayOption,
      newSpentAndReceivedAmountDetails
    );

    localStorage.setItem(
      "spentAndReceivedAmountDetails",
      JSON.stringify(newSpentAndReceivedAmountDetails)
    );
  }

  function handleDisplayTableOption(e) {
    setDisplayOption(e.target.value);
    updateNewDisplayArrayDetails(e.target.value, spentAndReceivedAmountDetails);
  }

  // handle delete method
  function updateNewDisplayArrayDetails(displayOption, totalItemsArray) {
    let newTempSpentAndReceivedAmountDetails;
    if (displayOption === "received") {
      newTempSpentAndReceivedAmountDetails = totalItemsArray.filter(
        (item) => item.spentOrReceived === "received"
      );
    } else if (displayOption === "spent") {
      newTempSpentAndReceivedAmountDetails = totalItemsArray.filter(
        (item) => item.spentOrReceived === "spent"
      );
    } else {
      newTempSpentAndReceivedAmountDetails = [...totalItemsArray];
    }

    setTempSpentAndReceivedAmountDetails(newTempSpentAndReceivedAmountDetails);
  }

  return (
    <div className="App container">
      <header className="App-header">
        <HeaderComponent />
      </header>
      <InputFormComponent
        receivedOrSpentName={receivedOrSpentName}
        amount={amount}
        handleReceivedOrSpentName={handleReceivedOrSpentName}
        handleamount={handleamount}
        handleSpentOrReceived={handleSpentOrReceived}
        spentOrReceived ={spentOrReceived}
        submitFormHandler={submitFormHandler}
      />
      <ShowDetailsComponent
        totalReceived={totalReceived}
        totalSpent={totalSpent}
        remaining={remaining}
      />
      <SpentOrReceivedTableComponent
        tempSpentAndReceivedAmountDetails={tempSpentAndReceivedAmountDetails}
        deleteButtonClickHandler={deleteButtonClickHandler}
        handleDisplayTableOption={handleDisplayTableOption}
        displayOption={displayOption}
      />
      <div className="App-footer">
        <ResetComponent
          resetExpensesHandler={resetExpensesHandler}
          tempSpentAndReceivedAmountDetails={tempSpentAndReceivedAmountDetails}
          displayOption={displayOption}
        />
      </div>
    </div>
  );
}

export default App;
