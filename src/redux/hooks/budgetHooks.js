import { useEffect, useState } from 'react';
import { getActualsForBudgetsAction,getBudgetTemplateAction,getProjectsBudgetListAction,getBudgetActualListAction, saveBudgetListAction } from '../index'

import { useSelector, useDispatch } from 'react-redux'
import { getProjectsBudgetListSaga } from '../sagas/budgetSagas';
import isEqual from 'lodash.isequal'


export const useGetActualForBudget = (filter) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.actualForBudgetReducer);


    useEffect(()=>{
        if(data===undefined){
            dispatch(getActualsForBudgetsAction(filter))
        }
    },[data]);

    return data;
}

export const useGetBudgetTemplate = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.budgetTemplateReducer);

    useEffect(()=>{
        if(data.length===0){
            dispatch(getBudgetTemplateAction())
        }
    },[data]);

  return data
}

export const useGetProjectsBudgetList = (filter) => {

    const [state, setState] = useState()
    
    const dispatch = useDispatch();

    if(!isEqual(state,filter)){
        setState(filter);
        dispatch(getProjectsBudgetListAction(filter))
    }

    const data = useSelector(state => state.projectsBudgetListReducer);


    return data;
}


export const useGetBudgetActualList = (filter) => {
    const [state, setState] = useState()
    const dispatch = useDispatch();

    
    
    if(!isEqual(state,filter)){
        setState(filter);
        dispatch(getBudgetActualListAction(filter))
    }

    const data = useSelector(state => state.budgetActualListReducer);


    return data;

}

export const useSaveBudgetList = (data=null) => {
    
    const dispatch = useDispatch();

    if(data===null) return;
        
    dispatch(saveBudgetListAction(data));
       
}