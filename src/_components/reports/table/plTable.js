import React, { useEffect, useState } from 'react';
import { dataFormat } from '../../../_helpers';
import ReportFilterMenu from '../reportFilterMenu'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Container from '@material-ui/core/Container';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import PLTableCell from './plTableCell'
import PlModal from './plModal'


import FabMenu from '../../tools/fabMenu'
import LongMenu from '../../tools/table/longMenu'

import { getPlTableValuesActions,getPlModalValuesActions,clearPlModalValuesActions,clearPlTableValuesActions } from '../../../redux'
import { useSelector,useDispatch } from 'react-redux'

const columns = [
    { id: 'expandButton', label: '' },
    { id: 'subCode', label: 'Kod' },
    { id: 'subCodeDesc', label: 'Açıklama' },
    { id: 'projectName', label: 'Proje' },
    { id: 'branchName', label: 'Şube' },
    {
        id: 'monthBudget',
        label: 'Aylık Bütçe',
        align: 'right',
        format: (value) => dataFormat.money(value, 0),
    },
    {
        id: 'actualCost',
        label: 'Aylık Gerçekleşen',
        align: 'right',
        format: (value) => dataFormat.money(value, 0),
    },
    {
        id: 'differance',
        label: 'Fark',
        align: 'right',
        format: (value) => dataFormat.money(value, 0),
    },
    {
        id: 'rate',
        label: 'Oran',
        align: 'right',
        format: (value) => dataFormat.percentage(value),
    },
    {
        id: 'nullCell',
        label: '',
        maxWidth: '2px',
        borderBottom:'0px'
    },
    {
        id: 'totalBudget',
        label: 'Toplam Bütçe',
        align: 'right',
        format: (value) => dataFormat.money(value, 0),
    },
    {
        id: 'totalActualCost',
        label: 'Toplam Gerçekleşen',
        align: 'right',
        format: (value) => dataFormat.money(value, 0),
    },
    {
        id: 'totalDifferance',
        label: 'Toplam Fark',
        align: 'right',
        format: (value) => dataFormat.money(value, 0),
    },
    {
        id: 'totalRate',
        label: 'Toplam Oran',
        align: 'right',
        format: (value) => dataFormat.percentage(value),
    },

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    fab: {
        margin: '0px',
        top: 'auto',
        right: 'auto',
        bottom: '20px',
        left: '20px',
        position: 'fixed'
    },
    container: {
        maxHeight: 'calc(100vh - 1vh);',
    },
    nullCell: {
        backgroundColor: '#FFFF',
        maxWidth: '9px',
        borderBottom:'0px'
    },
    gelirAlt: {
        backgroundColor: '#E2EFDA',
        height: '30px',
        fontSize: '10px'
    },
    gelir: {
        backgroundColor: '#C6E0B4',
        height: '30px',
        fontSize: '12px'
    },
    gelirToplam: {
        backgroundColor: '#A9D08E',
        fontSize: '13px',
        fontWeight: 'bold',
        height: '50px'
    },
    giderAlt: {
        backgroundColor: '#FEF5F0',
        height: '30px',
        fontSize: '10px'
    },
    gider: {
        backgroundColor: '#FCE4D6',
        height: '30px',
        fontSize: '12px'
    },
    giderAltToplam: {
        backgroundColor: '#F8CBAD',
        height: '40px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    giderToplam: {
        backgroundColor: '#F4B084',
        height: '50px',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    faizAlt: {
        backgroundColor: '#ECF4FA',
        height: '30px',
        fontSize: '10px'
    },
    faiz: {
        backgroundColor: '#DDEBF7',
        height: '30px',
        fontSize: '12px'
    },
    faizToplam: {
        backgroundColor: '#DDEBF7',
        height: '50px',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    krediAlt: {
        backgroundColor: '#ECF4FA',
        height: '30px',
        fontSize: '10px'
    },
    kredi: {
        backgroundColor: '#DDEBF7',
        height: '30px',
        fontSize: '12px'
    },
    krediToplam: {
        backgroundColor: '#DDEBF7',
        height: '50px',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    ebitda: {
        backgroundColor: '#BDD7EE'
    },
    vok: {
        backgroundColor: '#BDD7EE'
    },
    fark: {
        backgroundColor: '#BDD7EE'
    },
    parent: {
        display: 'true'
    },
    child: {
        display: 'none'
    }


});


const generateClassNameForColor = (mainGroup, subGroup, isExpanded) => {

    switch (mainGroup + subGroup) {
        case 'GELİRGELİR': return isExpanded ? 'gelir' : 'gelirAlt';
        case 'GELİRTOPLAM': return 'gelirToplam';
        case 'GİDERGİDER1': return isExpanded ? 'gider' : 'giderAlt';
        case 'GİDERGİDER2': return isExpanded ? 'gider' : 'giderAlt';
        case 'GİDERGİDER3': return isExpanded ? 'gider' : 'giderAlt';
        case 'GİDERALT TOPLAM': return 'giderAltToplam';
        case 'GİDERTOPLAM': return 'giderToplam';
        case 'FAİZFAİZ': return isExpanded ? 'faiz' : 'faizAlt';
        case 'FAİZTOPLAM': return 'faizToplam';
        case 'KREDİKREDİ': return isExpanded ? 'kredi' : 'krediAlt';
        case 'KREDİTOPLAM': return 'krediToplam';
        case 'EBITDA': return 'ebitda';
        case 'VOK': return 'vok';
        case 'FARK': return 'fark';
        default: return '';
    }

}




function PlTable(props) {

    
    const {auth,plReportTableValuesReducers,reportFilter} = useSelector(state=>state)
    const classes = useStyles();
    const tableFilterArr = [{id:'',name:'Tümünü Aç/Kapat'},...plReportTableValuesReducers.filter(x=>x.subCode===''&&x.subCodeDesc!=='').map(({subCodeDesc,rootId})=>{return {id:rootId,name:subCodeDesc}})]
    const [openModal, setOpenModal] = useState(false);
    const [modalParams, setModalParams] = useState({ projectName: '', description: '' });
    const dispatch = useDispatch();
    
    // console.log('--- ', tableFilterArr);

    useEffect(() => {

        var postData = {
            moment: true,
            plReportType: 6,
            projectCode: reportFilter.projects,
            month: reportFilter.month,
            currency: reportFilter.currency,
        }
        if(postData.projectCode.length>0)
            dispatch(getPlTableValuesActions(postData))
    }, [reportFilter,auth,dispatch]);

    useEffect(()=>{
        return ()=> dispatch(clearPlTableValuesActions())
    },[dispatch])


    const handleExpand = (root) => {

        var elements = plReportTableValuesReducers.filter(obj => obj.parentId === root);

        if (elements.length === 0) return;

        var element = document.getElementById(elements[0].id);



        if (element.style.display !== 'none') {

            var elementWithChilds = plReportTableValuesReducers.filter(obj => obj.rootId.includes(root + ':'));

            for (let index = 0; index < elementWithChilds.length; index++) {

                document.getElementById(elementWithChilds[index].id).style.display = ('none');;
            }
        } else {
            for (let index = 0; index < elements.length; index++) {

                document.getElementById(elements[index].id).style.display = ('table-row');
            }
        }

    }

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleModalOpen = async (_moment, _budgetOrCost, _projectCode, _subCode, _projectName, _subCodeDesc, _branchCode) => {

        var pCodes = _projectCode === '' ? reportFilter.projects : [_projectCode]


        var postData = {
            subCode: _subCode,
            moment: _moment,
            budgetOrCostType: _budgetOrCost,
            projectCode: pCodes,
            branchCode:_branchCode,
            month: reportFilter.month,
            currency: reportFilter.currency,
        }


        setModalParams({
            projectName: _projectName,
            description: _subCodeDesc
        });
        
        dispatch(clearPlModalValuesActions())
        dispatch(getPlModalValuesActions(postData));
        setOpenModal(true);
    }

    const selectFilter=(id)=>{
        handleExpand(id);
    }
    
    const resultTable = (
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" size='small' id="pl_tablo">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            if(column.id == 'expandButton')
                            {
                               return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth,maxWidth:column.maxWidth }}
                                    >
                                        <LongMenu options={tableFilterArr} selectFilter={selectFilter}></LongMenu>
                                    </TableCell>
                                )
                            }else{
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth,maxWidth:column.maxWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                )
                            }})}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {plReportTableValuesReducers.map((row) => {
                        return (
                            <TableRow id={row.id} className={classes[generateClassNameForColor(row.mainGroup, row.subGroup, row.isExpanded)]} 
                                hover={true} role="checkbox"
                                tabIndex={-1} key={row.id} style={row.isExpanded ? { display: 'table-row' } : { display: 'none' }}>
                                {columns.map((column) => {
                                    if (column.id === 'expandButton') {
                                        return (
                                            <PLTableCell
                                                key={column.id}
                                                cellName={classes[column.id]}
                                                columnId={column.id}
                                                columnAlign={column.align}
                                                rootId={row.rootId}
                                                handleExpand={handleExpand} />
                                        );
                                    } else if (column.id === 'monthBudget') {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                className={classes[column.id]}
                                                key={column.id}
                                                align={column.align}
                                                style={{fontWeight:row.subCode===''?500:400}}
                                                onClick={(e) => value > 0 && handleModalOpen(true, 1, row.projectCode, row.subCode, row.projectName, row.subCodeDesc,row.branchCode)}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    } else if (column.id === 'actualCost') {
                                        const value = row[column.id];
                                        return (
                                            <TableCell className={classes[column.id]}
                                                key={column.id}
                                                align={column.align}
                                                style={{fontWeight:row.subCode===''?500:400}}
                                                onClick={(e) => value > 0 && handleModalOpen(true, 2, row.projectCode, row.subCode, row.projectName, row.subCodeDesc,row.branchCode)}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    } else if (column.id === 'totalBudget') {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                className={classes[column.id]}
                                                key={column.id}
                                                align={column.align}
                                                style={{fontWeight:row.subCode===''?500:400}}
                                                onClick={(e) => value > 0 && handleModalOpen(false, 1, row.projectCode, row.subCode, row.projectName, row.subCodeDesc,row.branchCode)}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    } else if (column.id === 'totalActualCost') {
                                        const value = row[column.id];
                                        return (
                                            <TableCell className={classes[column.id]}
                                                key={column.id}
                                                align={column.align}
                                                style={{fontWeight:row.subCode===''?500:400}}
                                                onClick={(e) => value > 0 && handleModalOpen(false, 2, row.projectCode, row.subCode, row.projectName, row.subCodeDesc,row.branchCode)}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    } else {
                                        const value = row[column.id];
                                        return (
                                            <TableCell className={classes[column.id]} key={column.id} align={column.align} style={{fontWeight:row.subCode===''?500:400}} >
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        );
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    )


    
    return (
        <div>
            

            
            <FabMenu config={{saveExcel:true , dataRefresh:true}} excelData={plReportTableValuesReducers}></FabMenu>
            
            {/* <FloatingActionButton size="small" color="secondary" aria-label="add" className={classes.fab}><ContentAdd /></FloatingActionButton> */}
            <Container maxWidth="xl" style={{marginTop:10}}>
                <ReportFilterMenu />
                {resultTable}
            </Container>
            <PlModal modalParams={modalParams} openModal={openModal} onClose={handleModalClose}></PlModal>

            {/* <PlModalTable/> */}
        </div>
    );
}



export default PlTable;