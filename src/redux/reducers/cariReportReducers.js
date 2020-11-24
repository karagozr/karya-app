import { cariReportConstants as types } from '../constants';


export function cariReportTitleReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_CARI_REPORT_TITLES:
      return payload
    case types.CLEAR_CARI_REPORT_TITLES:
      return [];
    default:
      return state
  }
}

export function cariReportSubGroupReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_CARI_REPORT_SUB_GROUP:
      return payload
    case types.CLEAR_CARI_REPORT_SUB_GROUP:
      return [];
    default:
      return state
  }
}

export function cariReportSubGroupDetailReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_CARI_REPORT_SUB_GROUP_DETAIL:
      return payload
    case types.CLEAR_CARI_REPORT_SUB_GROUP_DETAIL:
      return [];
    default:
      return state
  }
}

export function cariReportSubGroupDetailFisNoReducers(state = [], {type,payload}) {
  switch (type) {
    case types.SET_CARI_REPORT_SUB_GROUP_DETAIL_FISNO:
      return payload
    case types.CLEAR_CARI_REPORT_SUB_GROUP_DETAIL_FISNO:
      return [];
    default:
      return state
  }
}