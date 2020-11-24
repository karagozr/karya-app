import React,{useEffect} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { alertActions } from '../../redux';

import { useSelector ,useDispatch} from 'react-redux'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export const Toast = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const {alert} = useSelector(state => state) 

    useEffect(() => {
        alert.type ? setOpen(true) : setOpen(false);
    }, [alert.type]);

    const handleClose = (event, reason) => {
        dispatch(alertActions.clear())
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={alert.type==='error'?6000:3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alert.type}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
}


