import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import IconButton from '@material-ui/core/IconButton'
import { LinearIndeterminate } from '../../tools'
import FabMenu from '../../tools/fabMenu'
import { useSelector, useDispatch } from 'react-redux'
import { setPivotReportTemplateApplyValuesActions } from '../../../redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        height: 'auto',
        maxHeight: 'calc(100vh - 65vh);',

    },
    listButton: {
        transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.shortest,
        }),
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: '#a7d4ec',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
            transitionProperty: 'background-color',
            transitionDuration: '50ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.46, 0.9)',
            transitionDelay: '0ms'
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        height: '50vh',
        width: '40vw',
        minWidth: 320,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '5px'
    },
}));


const PivotReportSelectModal = (props) => {
    const [open, setOpen] = useState(true)
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectData = useSelector(state => state.pivotReporttemplateValuesReducers);


    const body = (
        <div className={classes.paper}>

            <Container maxWidth="sm">
                <FormControl style={{ alignItems: 'center', position: 'absolute', top: 0, right: 0 }}>
                    <IconButton className={classes.iconButton} name="search" color="secondary" onClick={(e) => props.selectReportTemplate(null)}>
                        <CloseSharpIcon />
                    </IconButton>
                </FormControl>
                <h4 id="simple-modal-title" style={{ marginLeft: '5px' }}>RAPOR ŞABLONU SEÇİNİZ</h4>

                <List className={classes.list} style={{ marginTop: '10px' }}>
                    <ListItem key={0} className={classes.listButton} button onClick={(e) => { props.selectReportTemplate(null) }}>
                        <ListItemText key={0} primary={'> - Ham Veri'} />
                    </ListItem>
                    {selectData? selectData.map((item, index) => (
                        <ListItem key={index} className={classes.listButton} button onClick={(e) => { props.selectReportTemplate({ id: item.id, reportName: item.reportName, jsonData: item.jsonData }) }}>
                            <ListItemText key={index} primary={(index + 1) + ' - ' + item.reportName} />
                        </ListItem>
                    )):(null)}
                </List>
            </Container>

        </div>
    );

    return (

        <Modal
            className={classes.modal}
            open={props.open}
            disableBackdropClick
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}

export default PivotReportSelectModal;
