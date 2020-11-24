import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { LoadPanel } from 'devextreme-react/load-panel';
import { useSelector } from 'react-redux'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const position = { of: '#appMain' };

export const DxLoadPanel = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const { load } = useSelector(state => state)

    useEffect(() => {
        load === 0 ? setOpen(false) : setOpen(true);
    }, [load]);

    return (
        <div className={classes.root}>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                position={position}
                visible={open}
                showIndicator={true}
                shading={true}
                showPane={true}
            />
        </div>
    );
}


