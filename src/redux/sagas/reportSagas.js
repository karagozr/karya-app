import { put, call } from 'redux-saga/effects'
import { reportConstants as types } from '../constants'
import { get, post, getUsername } from '../services/api';
import { alertActions } from '../actions';

const REPORT_URL = '/report'

const PL_DASH_VALUES_URL = '/getpl';

const REPORT_FILTER_URL = '/getplfilterdata';
const PL_REPORT_TABLE_URL = '/getplwithdetail';
const PL_REPORT_MODAL_DETAIL_URL = '/getpldetail';
const PIVOT_REPORT_VALUES_URL = '/getactualrawdata';
const PIVOT_REPORT_TEMPLATE_VALUES_URL = '/GetPivotTemplate';
const PIVOT_REPORT_ADD_TEMPLATE_VALUES_URL = '/AddPivotTemplate';
const PIVOT_REPORT_UPDATE_TEMPLATE_VALUES_URL = '/UpdatePivotTemplate';
const PIVOT_REPORT_DELETE_TEMPLATE_VALUES_URL = '/DeletePivotTemplate';

export function* getReportProjectCodes() {
  const url = REPORT_URL + REPORT_FILTER_URL;
  const { data, success } = yield call(get, url, null);
  if (success) {
    yield put({ type: types.SET_REPORT_PROJECT_CODES, payload: data })
  } else {
    yield put({ type: types.CLEAR_REPORT_PROJECT_CODES, payload: {} })
  }
};


export function* getPlDashValuesSaga({ payload }) {
  const url = REPORT_URL + PL_DASH_VALUES_URL;
  const { data, success } = yield call(post, url, payload);
  if (success) {
    yield put({ type: types.SET_PL_DASH_VALUES, payload: {...data,plReportType : payload.plReportType,moment : payload.moment} })

  } else {
    yield put({ type: types.CLEAR_PL_DASH_VALUES, payload: {} })
  }
};


export function* getPlReportForTable({ payload }) {
  const url = REPORT_URL + PL_REPORT_TABLE_URL;
  const { data, success } = yield call(post, url, payload);
  if (success) {
    const username = yield call(getUsername);
    if (username === 'Admin') {
      yield put({ type: types.SET_PL_REPORT_TABLE_VALUES, payload: data })
    } else {
      let ebitda = data.find(x => x.mainGroup === 'EBITDA')
      yield put({ type: types.SET_PL_REPORT_TABLE_VALUES, payload: data.filter(x => x.id < ebitda.id) })
    }

  } else {
    yield put({ type: types.CLEAR_PL_REPORT_TABLE_VALUES, payload: {} })
  }
};

export function* getPlReportForModalDetail({ payload }) {
  const url = REPORT_URL + PL_REPORT_MODAL_DETAIL_URL;
  const { data, success } = yield call(post, url, payload);
  if (success) {
    yield put({ type: types.SET_PL_REPORT_MODAL_VALUES, payload: data })
  } else {
    yield put({ type: types.CLEAR_PL_REPORT_MODAL_VALUES, payload: {} })
  }
};


export function* getPivotReportValuesSaga({ payload }) {
  const url = REPORT_URL + PIVOT_REPORT_VALUES_URL;
  const { data, success } = yield call(post, url, payload);
  if (success) {
    yield put({ type: types.SET_PIVOT_REPORT_VALUES, payload: data})
  } else {
    yield put({ type: types.CLEAR_PIVOT_REPORT_VALUES, payload: {} })
  }
};


//#region Pivot Template
/**
 * Pivot Template Data Crud opararions
 * get/add/update/delete
 */
export function* getPivotReportTemplateValuesSaga({ payload }) {
  const url = REPORT_URL + PIVOT_REPORT_TEMPLATE_VALUES_URL;
  const { data, success } = yield call(get, url, payload);
  if (success) {
    yield put({ type: types.SET_PIVOT_REPORT_TEMPLATE_VALUES, payload: data })
  } else {
    yield put({ type: types.CLEAR_PIVOT_REPORT_VALUES, payload: {} })
  }
};

export function* addPivotReportTemplateValuesSaga({ payload }) {
  const url = REPORT_URL + PIVOT_REPORT_ADD_TEMPLATE_VALUES_URL;
  const { success } = yield call(post, url, payload);
  if (success)
    yield put(alertActions.success(`Şablon Kaydedildi`))
};

export function* updatePivotReportTemplateValuesSaga({ payload }) {
  const url = REPORT_URL + PIVOT_REPORT_UPDATE_TEMPLATE_VALUES_URL;
  const { success } = yield call(post, url, payload);
  if (success)
    yield put(alertActions.success(`Şablon Güncellendi`))
};

export function* deletePivotReportTemplateValuesSaga({ payload }) {
  const url = REPORT_URL + PIVOT_REPORT_DELETE_TEMPLATE_VALUES_URL;
  const { success } = yield call(post, url, payload);
  if (success)
    yield put(alertActions.success(`Şablon Silindi`))
};
//#endregion