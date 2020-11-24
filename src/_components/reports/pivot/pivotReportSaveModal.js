import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
    textFiled: {
        margin: theme.spacing(1),
        width:'90%'
    },
    button: {
        margin: theme.spacing(1),
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        height: '40vh',
        width: '40vw',
        minWidth: 320,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: '5px'
    },
}));


const PivotReportSaveModal = (props) => {

    const [open, setOpen] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        setOpen(props.open)
    }, [props])


    const body = (
        <div className={classes.paper}>
            <Container maxWidth="sm">
                <FormControl style={{ alignItems: 'center', position: 'absolute', top: 0, right: 0 }}>
                    <IconButton className={classes.iconButton} name="search" color="secondary" onClick={(e) => props.modalClose()}>
                        <CloseSharpIcon />
                    </IconButton>
                </FormControl>
                <h4 id="simple-modal-title" style={{ marginLeft: '5px' }}>RAPOR ŞABLONU SEÇİNİZ</h4>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField className={classes.textFiled}  id="standard-basic" label="Rapor Adı" value={props.templateName} onChange={(e) => props.fieldChanged(e.target.value)} />


                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={(e)=>props.saveTemplate()}
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >Güncelle</Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={(e)=>props.saveAsTemplate()}
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >Yeni Olarak Kaydet</Button>
                    </div>
                </form>


            </Container>
        </div>
    );

    return (
        <Modal
            className={classes.modal}
            open={open}
            disableBackdropClick
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
}

export default PivotReportSaveModal;



