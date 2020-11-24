import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CurrencyFormat from 'react-currency-format';


import { getPlDashValuesActions } from '../../../redux'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import "react-circular-progressbar/dist/styles.css";
import './plCard.css';

const useStyles = makeStyles({
    root: {
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    },
});


const PlCard = (props) => {
    const classes = useStyles()
    const data = useSelector(x => x.plDashValuesReducers).find(x => x.moment === props.params.moment && x.plReportType === props.params.plReportType)
    const reportFilter = useSelector(x => x.reportFilter);
    const dispatch = useDispatch();

    useEffect(() => {

        var filter = {
            moment: props.params.moment,
            plReportType: props.params.plReportType,
            projectCode: props.params.projects,
            month: props.params.month,
            currency: props.params.currency,
        }

        if (props.params.projects.length > 0) {
            dispatch(getPlDashValuesActions(filter));
        }

    }, [dispatch, reportFilter]);

    const plItem = () => (
        <Card className={classes.root} style={{ width: 'auto', height: 'auto' }} >
            <CardHeader
                title={props.name}
                style={{ backgroundColor: props.headerColor, height: 15 }}
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent style={{ backgroundColor: props.cardColor }}>

                <div className={classes.title} color="textPrimary">
                    <div className="underline row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>
                        <CurrencyFormat value={data.budget} displayType={'text'} thousandSeparator={true} decimalScale={0} renderText={value =>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6} >Bütçe :</Grid>
                                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                    {value}
                                </Grid>
                            </Grid>}
                        />
                    </div>
                    <div className="underline row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>

                        <CurrencyFormat value={data.actualCost} displayType={'text'} thousandSeparator={true} decimalScale={0} renderText={value =>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6} >Gerçekleşen :</Grid>
                                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                    <strong>
                                        {value}
                                    </strong>
                                </Grid>
                            </Grid>}
                        />
                    </div>
                    <div className="underline row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>
                        <CurrencyFormat value={data.differance} displayType={'text'} thousandSeparator={true} decimalScale={0} renderText={value =>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6}>Fark :</Grid>
                                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                    {value}
                                </Grid>
                            </Grid>}
                        />
                    </div>
                    <div className="row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={6}></Grid>
                            <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                {data.rate >= 0?(<CircularProgressbar className="mainCircular negative"
                                    strokeWidth={8}

                                    value={parseFloat(data.rate * 100).toFixed(0)}
                                    text={`${parseFloat(data.rate * 100).toFixed(0)}%`}

                                />):(<CircularProgressbar className="mainCircular positive"
                                    strokeWidth={8}

                                    value={parseFloat(data.rate * -100).toFixed(0)}
                                    text={`${parseFloat(data.rate * 100).toFixed(0)}%`}

                                />)}
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <div variant="body2">
                    <span style={{ fontSize: 17, fontWeight: "bold", marginBottom: 0 }}>2019</span>
                    <div className="underline row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>
                        <CurrencyFormat value={data.lastActualCost} displayType={'text'} thousandSeparator={true} decimalScale={0} renderText={value =>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6}>Gerçekleşen :</Grid>
                                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                    <strong>
                                        {value}
                                    </strong>
                                </Grid>
                            </Grid>}
                        />
                    </div>
                    <div className="underline row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>
                        <CurrencyFormat value={data.lastDifferance} displayType={'text'} thousandSeparator={true} decimalScale={0} renderText={value =>
                            <Grid container spacing={1}>
                                <Grid item xs={6} sm={6}>Fark :</Grid>
                                <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                    {value}
                                </Grid>
                            </Grid>}
                        />
                    </div>
                    <div className="row" style={{ marginTop: 5, borderBottomColor: props.headerColor }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={6}>
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
                                <CircularProgressbar className="secondCircular"
                                    strokeWidth={8}
                                    value={parseFloat(data.lastRate * 100).toFixed(0)}
                                    text={`${parseFloat(data.lastRate * 100).toFixed(0)}%`}
                                    styles={buildStyles({
                                        strokeLinecap: "butt"
                                    })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </CardContent>
        </Card >
    )


    const waitingForm = () =>
        (
            <div className="container" style={{ margin: "50px", marginBottom: "80px" }}>
                <CircularProgress></CircularProgress>
            </div>
        )

    const plrapor = () =>
        (
            <Grid>
                {reportFilter.projects.length == 0 ? (<div></div>) : (data == null || undefined ? waitingForm() : plItem())}
            </Grid>

        )


    return (
        <div >
            {plrapor()}
        </div>
    )
}

export default PlCard;
