import {get, post} from './api';

const REPORT_FILTER_URL = 'report/getplfilterdata';
const PL_REPORT_TABLE_URL = 'report/getplwithdetail';
const PL_REPORT_MODAL_DETAIL_URL = 'report/getpldetail';
// export const reportAction = {
//     getReportProjectCodes,
//     updateReportFilter,
//     deleteReportFilter,
//     getPlReportForTable,
//     getPlReportForModalDetail
// };


export const getReportProjectCodes = () => {
    return get(REPORT_FILTER_URL)
};

export const getPlReportForTable = (postData) => {
    return post(PL_REPORT_TABLE_URL,postData)
};

export const getPlReportForModalDetail = (postData) => {
    return post(PL_REPORT_MODAL_DETAIL_URL,postData)
};