import React, { useEffect, useState, useRef } from 'react';
import Container from '@material-ui/core/Container';

import { 
         addPivotReportTemplateValuesActions, 
         updatePivotReportTemplateValuesActions, 
         setPivotReportTemplateApplyValuesActions } from '../../../redux'

import { useDispatch } from 'react-redux'
import FabMenu from '../../tools/fabMenu'
import PivotReportSelectModal from './pivotReportSelectModal'
import PivotReportSaveModal from './pivotReportSaveModal'

import PivotTable from './pivotTable'
import {useActualCostPivotData,
    useActualCostPivotDataTemplate,
    useActualCostPivotDataApplyTemplate
} from '../../../redux/hooks' 

const  fieldsOfObj = 
            [ 
              { dataField: 'cariKod', caption: 'Cari Kod', dataType: 'string', area: 'filter' }
            , { dataField: 'rGrupKod', caption: 'R.Grp.Kodu', dataType: 'string', area: 'filter' }
            , { dataField: 'rGrupAd', caption: 'R.Grp.Adı', dataType: 'string', area: 'filter' }
            , { dataField: 'rHesapKod', caption: 'R.Hesap Kodu', dataType: 'string', area: 'filter' }
            , { dataField: 'rHesapAd', caption: 'R.Hesap Adı', dataType: 'string', area: 'filter' }
            , { dataField: 'projeKod', caption: 'Proje Kodu', dataType: 'string', area: 'filter' }
            , { dataField: 'projeAd', caption: 'Proje Adı', dataType: 'string', area: 'filter' }
            , { dataField: 'yilAy', caption: 'Yıl-Ay', dataType: 'string', area: 'filter' }
            , { dataField: 'paraBirimi', caption: 'Döviz', dataType: 'string', area: 'filter' }
            , { dataField: 'dovizBakiye', caption: 'Döv.Bakiye', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'tlBakiye', caption: 'Tl Bakiye', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'usdBakiye', caption: 'USD Bak.', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'euroBakiye', caption: 'Euro Bak.', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'miktar', caption: 'Miktar', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'nakitAkisKod', caption: 'Nakit Akış Kod', dataType: 'string', area: 'filter' }
            , { dataField: 'nakitAkisAd', caption: 'Nakit Akış Ad', dataType: 'string', area: 'filter' }
            , { dataField: 'tarih', caption: 'Tarih-Yıl', dataType: 'date', area: 'filter',groupInterval: 'year' }
            , { dataField: 'tarih', caption: 'Tarih-Ay', dataType: 'date', area: 'filter',groupInterval: 'month' }
            , { dataField: 'tarih', caption: 'Tarih', dataType: 'date', area: 'filter' }
            , { dataField: 'fisNo', caption: 'Fiş No', dataType: 'string', area: 'filter' }
            , { dataField: 'muhasebeHesapKod', caption: 'Muh.Hesap Kodu', dataType: 'string', area: 'filter' }
            , { dataField: 'muhasebeHesapAd', caption: 'Muh.Hesap Adı', dataType: 'string', area: 'filter' }
            , { dataField: 'aciklama', caption: 'Açıklama-1', dataType: 'string', area: 'filter' }
            , { dataField: 'aciklama2', caption: 'Açıklama-2', dataType: 'string', area: 'filter' }
            , { dataField: 'aciklama3', caption: 'Açıklama-3', dataType: 'string', area: 'filter' }
            , { dataField: 'subeKod', caption: 'Şube Kodu', dataType: 'string', area: 'filter' }
            , { dataField: 'subeAd', caption: 'Şube Adı', dataType: 'string', area: 'filter' }
            , { dataField: 'dovizBorc', caption: 'Döv.Borç', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'tlBorc', caption: 'Tl Borç', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'usdBorc', caption: 'USD Borç', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'euroBorc', caption: 'Euro Borç', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'dovizAlacak', caption: 'Döv.Alacak', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'tlAlacak', caption: 'Tl Alacak', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'usdAlacak', caption: 'USD Alacak', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'euroAlacak', caption: 'Euro Alacak', dataType: 'number', format: 'fixedPoint', area: 'filter', summaryType: 'sum' }
            , { dataField: 'kayitYapanKullanici', caption: 'Kyt.Kullanıcı', dataType: 'string', area: 'filter' }
            , { dataField: 'kayitTarihi', caption: 'Kyt.Tarih', dataType: 'date', area: 'filter' }]

            
const PivotReport = (props) => {

    const pivotRef = useRef(null);
    const data = useActualCostPivotData();
    useActualCostPivotDataTemplate();
    const selectedTemplate = useActualCostPivotDataApplyTemplate();

    const [dataSource, setDataSource] = useState([]);

    const [templateShape,setTemplateShape]=useState();
    const [templateName, setTemplateName] = useState(selectedTemplate.reportName);

    const [openSave, setOpenSave] = useState(false);
    const [openSelect, setOpenSelect] = useState(true);

    const dispatch = useDispatch();
    

    useEffect(() => {
        if(dataSource.length===0 && data.length>0)
        {
            setDataSource(data);
        }
        if(selectedTemplate.jsonData!==templateShape){
            selectedTemplate.jsonData ? setTemplateShape(JSON.parse(selectedTemplate.jsonData)) : setTemplateShape(fieldsOfObj)
        }
    }, [data,selectedTemplate]);

    const selectReportTemplate = (value) => {
        if (value !== null)
            dispatch(setPivotReportTemplateApplyValuesActions(value));
        else
            dispatch(setPivotReportTemplateApplyValuesActions({ id: 0, reportName: 'Yeni Rapor', jsonData: '' }));
        setTemplateName(selectedTemplate.reportName);
        setOpenSelect(false);
        
    }

    const pivotSave = () => {
        setTemplateName(selectedTemplate.reportName);
        setOpenSave(true);
    }

    const modalClose = () => {
        setTemplateName(selectedTemplate.reportName)
        setOpenSave(false)
    }

    const fieldChanged = (value) => {
        setTemplateName(value)
        console.log(value)
    }

    const saveTemplate = () => {
        if (templateName === '') return;

        var layout = pivotRef.current.props.dataSource._fields.map(({dataField, dataType, summaryType,format,area,filterType,filterValues})=>({dataField, dataType, summaryType,format,area,filterType,filterValues}))
        console.log('layout : ',pivotRef.current)
        var newData = { ...selectedTemplate, jsonData: JSON.stringify(layout), reportName: templateName }
        dispatch(updatePivotReportTemplateValuesActions(newData))
    }

    const saveAsTemplate = () => {
        if (templateName === '') return;
        var layout = pivotRef.current.props.dataSource._fields.map(({dataField, dataType, summaryType,format,area})=>({dataField, dataType, summaryType,format,area}))

        var newData = { reportName: templateName, jsonData: JSON.stringify(layout) }
        dispatch(addPivotReportTemplateValuesActions(newData))
    }

    return (
        <div>
            <FabMenu config={{ pivotSave: true }} clickForPivotSave={() => { pivotSave() }} ></FabMenu>
            <PivotReportSelectModal open={openSelect} selectReportTemplate={selectReportTemplate}></PivotReportSelectModal>
            <PivotReportSaveModal open={openSave} templateName={templateName}
                modalClose={modalClose}
                saveTemplate={saveTemplate} saveAsTemplate={saveAsTemplate} fieldChanged={fieldChanged}></PivotReportSaveModal>
            <Container maxWidth="xl" style={{marginTop:10}}>
                <PivotTable pivotRef={pivotRef} dataSource={dataSource} layout={templateShape} />
            </Container>
        </div>

    );
}

export default PivotReport;











