import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/core/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = ({ isOpen, message, onDidDismiss, success }) => {
  return (
    <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={ () => onDidDismiss && onDidDismiss() }
        message={message}
        //action={action}
        //onDidDismiss={ () => onDidDismiss && onDidDismiss() }
    >
      <Alert onClose={() => onDidDismiss && onDidDismiss()} severity={success} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomizedSnackbars