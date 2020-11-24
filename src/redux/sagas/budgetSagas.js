import { put, call } from 'redux-saga/effects'
import { budgetConstants as types } from '../constants'
import { get, post } from '../services/api';
import { alertActions } from '../actions';

const BUDGET_URL = '/Budget'
const GET_ACTUAL_FOR_BUDGET = '/GetActualForBudget';
const GET_BUDGET_TEMPLATE = '/GetBudgetTemplate';
const GET_PROJECTS_BUDGET_LIST = '/GetProjectBudgetList';   
const GET_BUDGET_ACTUAL_LIST = '/GetBudgetsWithActual';            
const SAVE_BUDGET_LIST = '/SaveBudgetList';          

export function* getActualForBudgetSaga({payload}) {
  const url = BUDGET_URL + GET_ACTUAL_FOR_BUDGET;
  const { data, success } = yield call(get, url, payload);
  if (success) {
    yield put({ type: types.SET_ACTUAL_FOR_BUDGET, payload: data })
  } else {
    yield put({ type: types.CLEAR_ACTUAL_FOR_BUDGET, payload: {} })
  }
};

export function* getBudgetTemplateSaga() {
  const url = BUDGET_URL + GET_BUDGET_TEMPLATE;
  const { data, success } = yield call(get, url, null);
  if (success) {
    yield put({ type: types.SET_BUDGET_TEMPLATE, payload: data })
  } else {
    yield put({ type: types.CLEAR_BUDGET_TEMPLATE, payload: {} })
  }
};

export function* getProjectsBudgetListSaga({ payload }) {
  const url = BUDGET_URL + GET_PROJECTS_BUDGET_LIST;
  const { data, success } = yield call(get, url, payload);

  if (success) {
    yield put({ type: types.SET_PROJECTS_BUDGET_LIST, payload: data })
  } else {
    yield put({ type: types.CLEAR_PROJECTS_BUDGET_LIST, payload: {} })
  }
};

export function* getBudgetActualListSaga({ payload }) {
  
  const url = BUDGET_URL + GET_BUDGET_ACTUAL_LIST;
  const { data, success } = yield call(get, url, payload);

  
  if (success) {
    yield put({ type: types.SET_BUDGET_ACTUAL_LIST, payload: data })
  } else {
    yield put({ type: types.CLEAR_BUDGET_ACTUAL_LIST, payload: {} })
  }
};

export function* saveBudgetListSaga({ payload }) {
  const url = BUDGET_URL + SAVE_BUDGET_LIST;
  const { success } = yield call(post, url, payload);
  if (success)
    yield put(alertActions.success(`Bütçe Kaydedildi`))
};

