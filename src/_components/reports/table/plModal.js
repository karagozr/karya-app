import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PlModalTable from './plModalTable'
//import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import FormControl from '@material-ui/core/FormControl';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import IconButton from '@material-ui/core/IconButton'
import {LinearIndeterminate} from '../../tools'
import FabMenu from '../../tools/fabMenu'
import { useSelector } from 'react-redux'



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        height: '85vh',
        width: '85vw',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '5px'
    },
}));

const PlModal = (props) => {

    const classes = useStyles();
    const modalData = useSelector(state=>state.plReportModalValuesReducers);
    



    const body = (
        <div className={classes.paper}>
            <h4 id="simple-modal-title" style={{ marginLeft:'50px' }}>{props.openModal ? props.modalParams.description : ''} - {props.openModal ? props.modalParams.projectName : ''}</h4>
            <FormControl style={{ alignItems: 'center',position:'absolute', top:0, right:0 }}>
                <IconButton className={classes.iconButton} name="search" color="secondary" onClick={props.onClose}>
                    <CloseSharpIcon />
                </IconButton>
            </FormControl>
            <FabMenu excelData={modalData} config={{saveExcel:true }}></FabMenu>
            {modalData.length>0 ? (<PlModalTable data={modalData} />) : (<LinearIndeterminate></LinearIndeterminate>)}
        </div>
    );

    return (
        
        <Modal
            className={classes.modal}
            open={props.openModal}
            onClose={props.onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}

PlModal.propTypes = {
    modalData:PropTypes.array
  }

export default PlModal;

