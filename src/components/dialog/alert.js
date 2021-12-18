import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ isOpen, header, body, onClickYes, onDidDismiss  }) {
  const [open, setOpen] = React.useState(false);

  const handleYes = () => {
    setOpen(false);
    onClickYes && onClickYes()
  };

  const handleClose = () => {
    setOpen(false);
    onDidDismiss && onDidDismiss()
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Үгүй
          </Button>
          <Button onClick={handleYes} color="primary" autoFocus>
            Тийм
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}