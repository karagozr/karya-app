import { takeEvery, takeLatest } from 'redux-saga/effects';
import { login } from './authSagas';
import { getReportProjectCodes } from './reportSagas';

import { getPlDashValuesSaga } from './reportSagas';

import { getPlReportForTable } from './reportSagas';
import { getPlReportForModalDetail } from './reportSagas';
import { getPivotReportValuesSaga } from './reportSagas';
import { getPivotReportTemplateValuesSaga } from './reportSagas'
import { addPivotReportTemplateValuesSaga } from './reportSagas'
import { updatePivotReportTemplateValuesSaga } from './reportSagas'
import { deletePivotReportTemplateValuesSaga } from './reportSagas'

import { getCariReportTitleSaga } from './cariReportSagas';
import { getCariReportSubGroupSaga } from './cariReportSagas';
import { getCariReportSubGroupDetailSaga } from './cariReportSagas';
import { getCariReportSubGroupDetailFisNoSaga } from './cariReportSagas';

import { getActualForBudgetSaga }   from './budgetSagas';
import { getBudgetTemplateSaga }    from './budgetSagas';
import { getProjectsBudgetListSaga }from './budgetSagas';
import { getBudgetActualListSaga }  from './budgetSagas';
import { saveBudgetListSaga }       from './budgetSagas';

//CONSTANTS
import { asyncUserConstants } from '../constants';
import { reportConstants } from '../constants';
import { cariReportConstants } from '../constants';
import { budgetConstants } from '../constants';

export default function* watchUserAuthentication() {

  yield takeLatest(asyncUserConstants.LOGIN_REQUEST, login);
  yield takeLatest(reportConstants.REQUEST_REPORT_PROJECT_CODES, getReportProjectCodes);

  yield takeEvery(reportConstants.REQUEST_PL_DASH_VALUES, getPlDashValuesSaga);

  yield takeLatest(reportConstants.REQUEST_PL_REPORT_TABLE_VALUES, getPlReportForTable);
  yield takeLatest(reportConstants.REQUEST_PL_REPORT_MODAL_VALUES, getPlReportForModalDetail);

  yield takeLatest(reportConstants.REQUEST_PIVOT_REPORT_VALUES, getPivotReportValuesSaga);

  yield takeLatest(reportConstants.REQUEST_PIVOT_REPORT_TEMPLATE_VALUES, getPivotReportTemplateValuesSaga);
  yield takeLatest(reportConstants.REQUEST_ADD_PIVOT_REPORT_TEMPLATE_VALUES, addPivotReportTemplateValuesSaga);
  yield takeLatest(reportConstants.REQUEST_UPDATE_PIVOT_REPORT_TEMPLATE_VALUES, updatePivotReportTemplateValuesSaga);
  yield takeLatest(reportConstants.REQUEST_DELETE_PIVOT_REPORT_TEMPLATE_VALUES, deletePivotReportTemplateValuesSaga);

  yield takeLatest(cariReportConstants.REQUEST_CARI_REPORT_TITLES, getCariReportTitleSaga);
  yield takeLatest(cariReportConstants.REQUEST_CARI_REPORT_SUB_GROUP, getCariReportSubGroupSaga);
  yield takeLatest(cariReportConstants.REQUEST_CARI_REPORT_SUB_GROUP_DETAIL, getCariReportSubGroupDetailSaga);
  yield takeLatest(cariReportConstants.REQUEST_CARI_REPORT_SUB_GROUP_DETAIL_FISNO, getCariReportSubGroupDetailFisNoSaga);

  yield takeLatest(budgetConstants.REQUEST_ACTUAL_FOR_BUDGET, getActualForBudgetSaga);
  yield takeLatest(budgetConstants.REQUEST_BUDGET_TEMPLATE, getBudgetTemplateSaga);
  yield takeLatest(budgetConstants.REQUEST_PROJECTS_BUDGET_LIST, getProjectsBudgetListSaga);
  yield takeLatest(budgetConstants.REQUEST_BUDGET_ACTUAL_LIST, getBudgetActualListSaga);
  yield takeLatest(budgetConstants.REQUEST_SAVE_BUDGET_LIST, saveBudgetListSaga);

}


