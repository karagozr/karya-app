import {budgetConstants as types} from '../constants';

export const getActualsForBudgetsAction = (filter) => {
    return {
      type: types.REQUEST_ACTUAL_FOR_BUDGET,
      payload:filter
    }
};

export const getBudgetTemplateAction = () => {
  return {
    type: types.REQUEST_BUDGET_TEMPLATE,
    payload:{}
  }
};

export const getProjectsBudgetListAction = (filter) => {
  return {
    type: types.REQUEST_PROJECTS_BUDGET_LIST,
    payload:filter
  }
};

export const getBudgetActualListAction = (filter) => {
    return {
      type: types.REQUEST_BUDGET_ACTUAL_LIST,
      payload:filter
    }
};

export const updateBudgetListAction = (data) => {
  return {
    type: types.SET_BUDGET_ACTUAL_LIST,
    payload:data
  }
};

export const saveBudgetListAction = (data) => {
    return {
      type: types.REQUEST_SAVE_BUDGET_LIST,
      payload:data
    }
};
