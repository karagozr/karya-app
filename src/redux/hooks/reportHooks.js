import { useState, useEffect } from 'react';
import { getPivotReportValuesActions, 
    getPivotReportTemplateValuesActions, 
    addPivotReportTemplateValuesActions, 
    updatePivotReportTemplateValuesActions, 
    setPivotReportTemplateApplyValuesActions } from '../index'

import { useSelector, useDispatch } from 'react-redux'



export const useActualCostPivotData = () => {
    const dispatch = useDispatch();
    const {pivotReportValuesReducers} = useSelector(state => state);
    

    useEffect(()=>{
        if(pivotReportValuesReducers.length===0){
            dispatch(getPivotReportValuesActions())
        }
    },[pivotReportValuesReducers]);

  return pivotReportValuesReducers
}

export const useActualCostPivotDataTemplate = () => {
    const dispatch = useDispatch();
    const {pivotReporttemplateValuesReducers} = useSelector(state => state);

    useEffect(()=>{
        console.log('pivotReporttemplateValuesReducers : ',pivotReporttemplateValuesReducers);
        if(pivotReporttemplateValuesReducers===null){
            dispatch(getPivotReportTemplateValuesActions())
        }
    },[pivotReporttemplateValuesReducers]);

  return pivotReporttemplateValuesReducers
}

export const useActualCostPivotDataApplyTemplate = () => {
    const dispatch = useDispatch();
    const {pivotReporttemplateApplyValuesReducers} = useSelector(state => state);


    return pivotReporttemplateApplyValuesReducers
}