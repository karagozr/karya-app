import { put, call } from 'redux-saga/effects'
import { cariReportConstants as types } from '../constants'
import { get } from '../services/api';

const REPORT_URL = '/Report'
const CARI_REPORT_TITLES = '/CariReport';
const CARI_REPORT_SUB_GROUP = '/CariReport/SubGroup';
const CARI_REPORT_SUB_GROUP_DETAIL = '/CariReport/SubGroup/GrupDetail';
const CARI_REPORT_SUB_GROUP_DETAIL_FISNO = '/CariReport/SubGroup/GrupDetail/FisDetail';

export function* getCariReportTitleSaga() {
  const url = REPORT_URL + CARI_REPORT_TITLES;
  const { data, success } = yield call(get, url, null);
  if (success) {
    yield put({ type: types.SET_CARI_REPORT_TITLES, payload: data })
  } else {
    yield put({ type: types.CLEAR_CARI_REPORT_TITLES, payload: {} })
  }
};

export function* getCariReportSubGroupSaga({ payload }) {
    const url = REPORT_URL + CARI_REPORT_SUB_GROUP;
    const { data, success } = yield call(get, url, payload);
    if (success) {
      yield put({ type: types.SET_CARI_REPORT_SUB_GROUP, payload: data })
    } else {
      yield put({ type: types.CLEAR_CARI_REPORT_SUB_GROUP, payload: {} })
    }
};

export function* getCariReportSubGroupDetailSaga({ payload }) {
    const url = REPORT_URL + CARI_REPORT_SUB_GROUP_DETAIL;
    const { data, success } = yield call(get, url, payload);
    if (success) {
      yield put({ type: types.SET_CARI_REPORT_SUB_GROUP_DETAIL, payload: data })
    } else {
      yield put({ type: types.CLEAR_CARI_REPORT_SUB_GROUP_DETAIL, payload: {} })
    }
};

export function* getCariReportSubGroupDetailFisNoSaga({ payload }) {
  const url = REPORT_URL + CARI_REPORT_SUB_GROUP_DETAIL_FISNO;
  const { data, success } = yield call(get, url, payload);
  if (success) {
    yield put({ type: types.SET_CARI_REPORT_SUB_GROUP_DETAIL_FISNO, payload: data })
  } else {
    yield put({ type: types.CLEAR_CARI_REPORT_SUB_GROUP_DETAIL_FISNO, payload: {} })
  }
};