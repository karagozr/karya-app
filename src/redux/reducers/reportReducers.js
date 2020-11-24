import { reportConstants as types } from '../constants';

let today = new Date();
const initialState = {projects:[],month:today.getMonth(),currency:'USD', deepSearch:false}

export function reportFilter(state = initialState, {type,payload}) {
  switch (type) {
    case types.SET_FILTER_VALUES:
       var newState = {...state,...payload}
       newState.projects=payload.projects;
      return newState
    case types.CLEAR_FILTER_VALUES:
      return initialState;
    default:
      return state
  }
}

export function reportFilterProjectCodes(state = [], {type,payload}) {
  switch (type) {
    case types.SET_REPORT_PROJECT_CODES:
      return payload
    case types.CLEAR_REPORT_PROJECT_CODES:
      return [];
    default:
      return state
  }
}

export function plDashValuesReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_PL_DASH_VALUES:
      return  [...state,payload]
    case types.CLEAR_PL_DASH_VALUES:
      return [];
    default:
      return state
  }
}

export function plReportTableValuesReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_PL_REPORT_TABLE_VALUES:
      return payload
    case types.CLEAR_PL_REPORT_TABLE_VALUES:
      return [];
    default:
      return state
  }
}

export function plReportModalValuesReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_PL_REPORT_MODAL_VALUES:
      return payload
    case types.CLEAR_PL_REPORT_MODAL_VALUES:
      return [];
    default:
      return state
  }
}

export function pivotReportValuesReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_PIVOT_REPORT_VALUES:
      return payload
    case types.CLEAR_PIVOT_REPORT_VALUES:
      return [];
    default:
      return state
  }
}

export function pivotReporttemplateValuesReducers(state = null, {type,payload}) {
  switch (type) {
    case types.SET_PIVOT_REPORT_TEMPLATE_VALUES:
      return payload
    case types.CLEAR_PIVOT_REPORT_TEMPLATE_VALUES:
      return null;
    default:
      return state
  }
}

export function pivotReporttemplateApplyValuesReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_PIVOT_REPORT_TEMPLATE_APPLY_VALUES:
      return payload
    case types.CLEAR_PIVOT_REPORT_TEMPLATE_APPLY_VALUES:
      return [];
    default:
      return state
  }
}