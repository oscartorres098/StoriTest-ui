import { useState, forwardRef, useImperativeHandle } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar = forwardRef((props, ref) => {
    const [open, setOpen]                       = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');
    const vertical = 'top';
    const horizontal = 'right';

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleSnackbarOpen = (message, type) => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setOpen(true);
    };

    useImperativeHandle(ref, () => ({
        handleSnackbarOpen: handleSnackbarOpen
    }));

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar   open={open} 
                        autoHideDuration={3000} 
                        onClose={handleClose} 
                        anchorOrigin={{ vertical, horizontal }}
                        >
                <Alert onClose={handleClose} severity={snackbarType}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
});

export { CustomizedSnackbar };
