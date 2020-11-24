import { combineReducers } from 'redux';
import auth from './authReducers';
import alert from './alertReducers';
import load from './loadReducers';
import { reportFilter } from './reportReducers';
import { reportFilterProjectCodes } from './reportReducers';

import { plDashValuesReducers } from './reportReducers';
import { plReportModalValuesReducers } from './reportReducers';
import { plReportTableValuesReducers } from './reportReducers';
import { pivotReportValuesReducers } from './reportReducers';
import { pivotReporttemplateValuesReducers } from './reportReducers';
import { pivotReporttemplateApplyValuesReducers } from './reportReducers';

import { cariReportTitleReducers }                  from './cariReportReducers';
import { cariReportSubGroupReducers }               from './cariReportReducers';
import { cariReportSubGroupDetailReducers }         from './cariReportReducers';
import { cariReportSubGroupDetailFisNoReducers }    from './cariReportReducers';
import { budgetActualListReducer }                  from './budgetReducers';
import { budgetTemplateReducer }                    from './budgetReducers';
import { projectsBudgetListReducer }                from './budgetReducers';
import { actualForBudgetReducer }                   from './budgetReducers';

const rootReducer = combineReducers({
    auth,
    alert,
    load,
    
    reportFilter,
    reportFilterProjectCodes,
    plDashValuesReducers,
    plReportModalValuesReducers,
    plReportTableValuesReducers,
    pivotReportValuesReducers,
    pivotReporttemplateValuesReducers,
    pivotReporttemplateApplyValuesReducers,

    cariReportTitleReducers,
    cariReportSubGroupReducers,
    cariReportSubGroupDetailReducers,
    cariReportSubGroupDetailFisNoReducers,

    budgetActualListReducer,
    budgetTemplateReducer,
    projectsBudgetListReducer,
    actualForBudgetReducer

});

export default rootReducer;