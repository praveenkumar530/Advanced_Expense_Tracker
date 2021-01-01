

// all details,  income array, spent array . 


export function getLsspentAndReceivedAmountDetails() {
    let spentAndReceivedAmountDetails = localStorage.getItem("spentAndReceivedAmountDetails");
    if (spentAndReceivedAmountDetails) {
      return JSON.parse(spentAndReceivedAmountDetails);
    }
    return [];
  }

  export function getLsincomeArray() {
    let incomeArray = localStorage.getItem("incomeArray");
    if (incomeArray) {
      return JSON.parse(incomeArray);
    }
    return [];
  }

  export function getLsspentArray() {
    let spentArray = localStorage.getItem("spentArray");
    if (spentArray) {
      return JSON.parse(spentArray);
    }
    return [];
  }


  const ls = {
    getLsincomeArray,
    getLsspentArray,
    getLsspentAndReceivedAmountDetails,
  };



export default ls;








