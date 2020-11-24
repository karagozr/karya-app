import {cariReportConstants as types} from '../constants';

export const getCariReportTitlesAction = () => {
    return {
      type: types.REQUEST_CARI_REPORT_TITLES,
      payload:{}
    }
};

export const getCariReportSubGroupAction = (filter) => {
    return {
      type: types.REQUEST_CARI_REPORT_SUB_GROUP,
      payload:filter
    }
};

export const getCariReportSubGroupDetailAction = (filter) => {
    return {
      type: types.REQUEST_CARI_REPORT_SUB_GROUP_DETAIL,
      payload:filter
    }
};

export const getCariReportSubGroupDetailFisNoAction = (filter) => {
  return {
    type: types.REQUEST_CARI_REPORT_SUB_GROUP_DETAIL_FISNO,
    payload:filter
  }
};