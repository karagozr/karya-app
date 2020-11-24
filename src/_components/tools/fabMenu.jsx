import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeepSearchIcon from '@material-ui/icons/FindReplaceTwoTone';
import PropTypes from 'prop-types';
import exportToExcel from './exportToExcel'


// const actions = [
//     { icon: <DeepSearchIcon />, name: 'Veri Tazele', id:'dataRefresh' },
//     { icon: <SaveIcon />, name: 'Kaydet', id: 'save' },
//     { icon: <SaveIcon />, name: 'Kaydet', id: 'pivotSave' },
//     // { icon: <PrintIcon />, name: 'Print' },
//     // { icon: <ShareIcon />, name: 'Share' },
//     // { icon: <FavoriteIcon />, name: 'Like' },
// ];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    fab: {
        width:'20px',
        margin: '0px',
        top: 'auto',
        right: 'auto',
        bottom: '20px',
        left: '35px',
        position: 'fixed'
    }
    

});

const FaBmenu = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const {saveData} = props;

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (e, actionName) => {
        if (actionName === 'saveExcel') {
            exportToExcel(props.excelData) 
        }
        setOpen(false);
    };


    return (
        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            className={classes.fab}
            icon={<SpeedDialIcon  openIcon={<EditIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {/* {actions.map((action) => (
                
            ))}
             */}
            {
                props.config.pivotSave!==undefined?(
                    <SpeedDialAction
                    key='pivotSave'
                    icon={ <SaveIcon />}
                    tooltipTitle='Pivot Kaydet'
                    onClick={(e)=>props.clickForPivotSave()}
                />
                ):(null)
            }
            {
                props.config.saveExcel!==undefined?(
                    <SpeedDialAction
                    key='saveExcel'
                    icon={ <SaveIcon />}
                    tooltipTitle='Excel Aktar'
                    onClick={(e) => handleClose(e, 'saveExcel')}
                />
                ):(null)
            }
            {
                props.config.dataRefresh!==undefined?(
                    <SpeedDialAction
                    key='dataRefresh'
                    icon={<DeepSearchIcon />}
                    tooltipTitle='Veritabanı Tazele '
                    onClick={(e) => handleClose(e, 'dataRefresh')}
                />
                ):(null)
            }
             {
                saveData.isSave?(
                    <SpeedDialAction
                    key='saveData'
                    icon={<SaveIcon />}
                    tooltipTitle='Kaydet'
                    onClick={(e) => saveData.saveFunc()}
                />
                ):(null)
            }
        </SpeedDial>
    );
}


FaBmenu.propTypes = {
    saveData:PropTypes.shape({
        isSave:PropTypes.bool.isRequired, 
        saveFunc:PropTypes.func.isRequired
    })
};

FaBmenu.defaultProps = {
    config:{
        pivotSave:undefined
    },
    saveData:{
        isSave:false, 
        saveFunc: null
    }
};

export default FaBmenu;