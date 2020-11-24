import {reportConstants as types} from '../constants';

export const setFilter = (filter) => {
  return {
    type: types.SET_FILTER_VALUES,
    payload :filter
  }
};

export const clearFilter = () => {
  return {
    type: types.CLEAR_FILTER_VALUES,
    payload:{}
  }
};

export const getFilterProjectCodes = () => {
  return {
    type: types.REQUEST_REPORT_PROJECT_CODES,
    payload:{}
  }
};


export const getPlDashValuesActions = (filter) => {
  return {
    type: types.REQUEST_PL_DASH_VALUES,
    payload:filter
  }
};
export const clearPlDashValuesActions = () => {
  return {
    type: types.CLEAR_PL_DASH_VALUES,
    payload:{}
  }
};

export const getPlTableValuesActions = (filter) => {
  return {
    type: types.REQUEST_PL_REPORT_TABLE_VALUES,
    payload:filter
  }
};
export const clearPlTableValuesActions = () => {
  return {
    type: types.CLEAR_PL_REPORT_TABLE_VALUES,
    payload:{}
  }
};
export const getPlModalValuesActions = (filter) => {
  return {
    type: types.REQUEST_PL_REPORT_MODAL_VALUES,
    payload:filter
  }
};
export const clearPlModalValuesActions = () => {
  return {
    type: types.CLEAR_PL_REPORT_MODAL_VALUES,
    payload:{}
  }
};
//filtre gidecek
export const getPivotReportValuesActions = () => {
  return {
    type: types.REQUEST_PIVOT_REPORT_VALUES,
    payload:{}
  }
};

export const getPivotReportTemplateValuesActions = () => {
  return {
    type: types.REQUEST_PIVOT_REPORT_TEMPLATE_VALUES,
    payload:{}
  }
};
export const addPivotReportTemplateValuesActions = (templateData) => {
  return {
    type: types.REQUEST_ADD_PIVOT_REPORT_TEMPLATE_VALUES,
    payload:templateData
  }
};
export const updatePivotReportTemplateValuesActions = (templateData) => {
  return {
    type: types.REQUEST_UPDATE_PIVOT_REPORT_TEMPLATE_VALUES,
    payload:templateData
  }
};
export const deletePivotReportTemplateValuesActions = (templateId) => {
  return {
    type: types.REQUEST_DELETE_PIVOT_REPORT_TEMPLATE_VALUES,
    payload:{templateId}
  }
};
export const setPivotReportTemplateValuesActions = (data) => {
  return {
    type: types.SET_PIVOT_REPORT_TEMPLATE_VALUES,
    payload:{data}
  }
};
export const clearPivotReportTemplateValuesActions = () => {
  return {
    type: types.CLEAR_PIVOT_REPORT_TEMPLATE_VALUES,
    payload:{}
  }
};

export const setPivotReportTemplateApplyValuesActions = (data) => {
  return {
    type: types.SET_PIVOT_REPORT_TEMPLATE_APPLY_VALUES,
    payload:data
  }
};
export const clearPivotReportTemplateApplyValuesActions = () => {
  return {
    type: types.CLEAR_PIVOT_REPORT_TEMPLATE_APPLY_VALUES,
    payload:{}
  }
};
