import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import BreadCrumbs from "../../tools/breadCrumbs"

import { getCariReportTitlesAction } from '../../../redux'
import { useSelector, useDispatch } from 'react-redux'

const { innerWidth: width, innerHeight: height } = window;

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        maxWidth: width,
        //backgroundColor: theme.palette.background.paper,
        backgroundColor: '#ffffe1',
        //position: 'relative',
        overflow: 'auto',
        height: height*0.85,
        //maxHeight: 'calc(100vh - 65vh);',

    },
    listButton: {
        transition: theme.transitions.create('background-color', {
            duration: theme.transitions.duration.shortest,
        }),
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: '#a7d4ec',
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


const MainList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cariReportTitles = useSelector(x => x.cariReportTitleReducers);

    useEffect(() => {
        dispatch(getCariReportTitlesAction())
    }, [])

    const clickHandle = (kod) => {

    }

    return (
        <div>
            <BreadCrumbs />
            <Container maxWidth="xl" style={{ marginTop: 10 }} >

                <div style={{ left: 100 }}>

                    <List className={classes.list} >
                        <h4 id="simple-modal-title" style={{ marginLeft: '37px', marginBottom: '0' }}>CARİ KOD LİSTESİ</h4>
                        <hr></hr>
                        {cariReportTitles.map((item, index) => (
                            <ListItem key={index} className={classes.listButton} button component="a" href={'/mainList/' + item.kod} >
                                <ListItemText key={index} primary={(index + 1) + ' - ' + item.kod} style={{ maxWidth: '120px', mimWidth: '150px' }} /><ListItemText primary={item.aciklama} style={{ textAlign: 'left' }} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Container>
        </div>


    );
}

export default MainList;