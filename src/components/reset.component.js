import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function ResetComponent({
  resetExpensesHandler,
  tempSpentAndReceivedAmountDetails,
  displayOption,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (x) => {
    setOpen(false);
  };

  const handleOkay = (x) => {
    setOpen(false);
    resetExpensesHandler();
  };

  if (tempSpentAndReceivedAmountDetails.length !== 0) {
    let dialogueMessage = "Are you sure you want to delete all the ";
    let buttonName = "Clear All";
    if (displayOption === "spent") {
      buttonName += " Spent Items";
      dialogueMessage += "Spent";
    } else if (displayOption === "received") {
      buttonName += " Received Items";
      dialogueMessage += "Received";
    }
    dialogueMessage += " items ?";

    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          className="mb-2"
          onClick={handleClickOpen}
          startIcon={<DeleteIcon />}
        >
          {buttonName}
        </Button>

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
            <DialogContentText>{dialogueMessage}</DialogContentText>
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
  return <div></div>;
}

export default ResetComponent;
