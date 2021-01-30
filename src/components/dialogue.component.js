import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DeleteIcon from "@material-ui/icons/Delete";

function DialogueComponent() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (x) => {
    setOpen(false);
    alert("Cancel");
  };

  const handleOkay = (x) => {
    setOpen(false);
    alert("okay");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
      >
        Clear All
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
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOkay} color="primary">
            Okay
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DialogueComponent;
