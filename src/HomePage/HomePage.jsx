import React, { useState,useRef } from 'react';
import Container from '@material-ui/core/Container';
import LogoMenu from '../images/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useWindowDimensions } from '../_components/tools/useWindowDimensions'
import BackgroundImage from '../images/bacgroundImage.png';
 //4236*1963
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const imageRate=1963/4236

export const HomePage = (props) => {
    const classes = useStyles();
    const { height, width } = useWindowDimensions();  
  
  return (
    <div className={classes.root} style={{height:height-57,backgroundImage: "linear-gradient(to left top, #b11f2a, #ffff)" }}>
      <img src={BackgroundImage} alt="GROUP" style={{display: 'block',margin: 'auto',width: width*0.50, height:width*0.50*imageRate}}></img>
    </div>
    
  );

 
}

