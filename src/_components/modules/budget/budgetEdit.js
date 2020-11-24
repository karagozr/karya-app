import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from "devextreme-react/button";
import DataGrid, {
    Column,
    Editing,
    Paging,
    Lookup
} from "devextreme-react/data-grid";
import SelectBox from 'devextreme-react/select-box';
import { DxGridTable } from '../../tools/table/dxGridTable'
import Form, {
    SimpleItem,
    GroupItem,
    Label
} from 'devextreme-react/form';

import { Popup } from 'devextreme-react/popup';
import { useGetBudgetActualList, useSaveBudgetList } from '../../../redux/hooks'
import {saveBudgetListAction,updateBudgetListAction} from '../../../redux'
import DetailTemplate from './DetailTemplate';
import FabMenu from '../../tools/fabMenu';
import { useDispatch } from 'react-redux'
import BreadCrumbs from "../../tools/breadCrumbs"
import NumberBox from 'devextreme-react/number-box';

const actualForBudgetBandColumnBands=[
    {bandName: 'ocak',    bandCaption: 'Ocak'    },   
    {bandName: 'subat',   bandCaption: 'Şubat'   },  
    {bandName: 'mart',    bandCaption: 'Mart'    },   
    {bandName: 'nisan',   bandCaption: 'Nisan'   },  
    {bandName: 'mayis',   bandCaption: 'Mayis'   },  
    {bandName: 'haziran', bandCaption: 'Haziran' },
    {bandName: 'temmuz',  bandCaption: 'Temmuz'  }, 
    {bandName: 'agustos', bandCaption: 'Ağustos' },
    {bandName: 'eylul',   bandCaption: 'Eylül'   },  
    {bandName: 'ekim',    bandCaption: 'Ekim'    },   
    {bandName: 'kasim',   bandCaption: 'Kasım'   },  
    {bandName: 'aralik',  bandCaption: 'Aralık'  }, 
]

const currencyCodes=[{code:'TL'},{code:'USD'},{code:'EUR'}]

const actualForButgetTableColumns = [
    //{ name: 'budgetMainGroup', title: 'Ana Grup', align: 'left', dataType: 'string' },
    { name: 'siteCode',                            title: 'Tesis',             align: 'left',  dataType: 'string',                       allowEditing:false },
    { name: 'branchName',                          title: 'Şube',              align: 'left',  dataType: 'string',                       allowEditing:false },
    { name: 'budgetMainCodeDesc',                  title: 'Ana Başlık',        align: 'left',  dataType: 'string',                       allowEditing:false },
    { name: 'budgetSubCodeDesc',                   title: 'Alt Başlık',        align: 'left',  dataType: 'string',                       allowEditing:false },
    { name: 'budgetSubCode',                       title: 'Alt Başlık Kod',    align: 'left',  dataType: 'string',                       allowEditing:false },
    { name: 'budgetCurrencyCode',                  title: 'B.Döviz',           align: 'left',  dataType: 'string',                       allowEditing:true,  isRequired:true, editor:{name:'lookUp', dataSource:currencyCodes, valueField:'code',displayField:'code'} },

    { name: 'actualOcak',    bandName: 'ocak',     title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualSubat',   bandName: 'subat',    title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualMart',    bandName: 'mart',     title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualNisan',   bandName: 'nisan',    title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualMayis',   bandName: 'mayis',    title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualHaziran', bandName: 'haziran',  title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualTemmuz',  bandName: 'temmuz',   title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualAgustos', bandName: 'agustos',  title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualEylul',   bandName: 'eylul',    title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualEkim',    bandName: 'ekim',     title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualKasim',   bandName: 'kasim',    title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
    { name: 'actualAralik',  bandName: 'aralik',   title: 'Gerç.',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:false },
            
    { name: 'budgetOcak',    bandName: 'ocak',     title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetSubat',   bandName: 'subat',    title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetMart',    bandName: 'mart',     title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetNisan',   bandName: 'nisan',    title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetMayis',   bandName: 'mayis',    title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetHaziran', bandName: 'haziran',  title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetTemmuz',  bandName: 'temmuz',   title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetAgustos', bandName: 'agustos',  title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetEylul',   bandName: 'eylul',    title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetEkim',    bandName: 'ekim',     title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetKasim',   bandName: 'kasim',    title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},
    { name: 'budgetAralik',  bandName: 'aralik',   title: 'Bütçe',             align: 'right', dataType: 'number', format: 'fixedPoint', allowEditing:true},

]


const newBudgetData = [{
    'id': 1,
    'budgetId': 1,
    'budgetName': 'Personel Sgk',
    'currencyCode': 'TL',
    'branchCode': 'Sube-3',
    'ocak': 0,
    'subat': 0,
    'mart': 0,
    'nisan': 0,
    'mayis': 0,
    'haziran': 0,
    'temmuz': 5,
    'agustos': 5,
    'eylul': 5,
    'ekim': 5,
    'temmuz': 5,
    'kasim': 5,
    'aralik': 5,
}, {
    'id': 2,
    'budgetId': 2,
    'budgetName': 'Personel Maas',
    'currencyCode': 'TL',
    'branchCode': 'Sube-2',
    'ocak': 0,
    'subat': 0,
    'mart': 0,
    'nisan': 0,
    'mayis': 0,
    'haziran': 0,
    'temmuz': 5,
    'agustos': 5,
    'eylul': 5,
    'ekim': 5,
    'temmuz': 5,
    'kasim': 5,
    'aralik': 5,
}, {
    'id': 3,
    'budgetId': 3,
    'budgetName': 'Personel Diğer',
    'currencyCode': 'TL',
    'branchCode': 'Sube-1',
    'ocak': 0,
    'subat': 0,
    'mart': 0,
    'nisan': 0,
    'mayis': 0,
    'haziran': 0,
    'temmuz': 5,
    'agustos': 5,
    'eylul': 5,
    'ekim': 5,
    'temmuz': 5,
    'kasim': 5,
    'aralik': 5,
}];

const currencyData = [{
    'code': 'TL',
    'name': 'TL'
}, {
    'code': 'USD',
    'name': 'USD'
}, {
    'code': 'EUR',
    'name': 'EUR'
}];

const branchData = [{
    'code': 'Sube-1',
    'name': 'Sube-1'
}, {
    'code': 'Sube-2',
    'name': 'Sube-2'
}, {
    'code': 'Sube-3',
    'name': 'Sube-3'
}];

const projectsData = [{
    'projectCode': 1,
    'projectName': 'Proje 1'
}, {
    'projectCode': 2,
    'projectName': 'Proje 2'
}, {
    'projectCode': 3,
    'projectName': 'Proje 2'
}];

const years = () => {
    var currentYear = new Date().getFullYear(), years = [];
    var startYear = 2020;  
    while ( startYear <= currentYear+1 ) {
        years.push({value:startYear++});
    }   
    return years;
}




export const BudgetEdit = (props) => {
    
    const {match} = props;
    const {params} = match;
    const thisYear = new Date().getFullYear()
    const [actualParams, setActualParams] = useState({actualYear:thisYear,currencyCode:'TL'})

    const [filter, setFilter]=useState({ projectCode: params.projectCode, budgetYear: params.budgetYear, actualYear:thisYear, currencyCode: 'TL' });
    // "projectCode": "string",
    // "budgetName": "string",
    // "buggetYear": 0,
    const dispatch = useDispatch();

    const actualForBudgetData =  useGetBudgetActualList(filter);
    const {budgetData,budgetDataSubDetail} =actualForBudgetData;
    const onEditingStart  = () => console.log('event proc. ', "EditingStart");
    const onInitNewRow    = () => console.log('event proc. ', "InitNewRow"  );
    const onRowInserting  = () => console.log('event proc. ', "RowInserting");
    const onRowInserted   = () => console.log('event proc. ', "RowInserted" );
    const onRowUpdating   = () => console.log('event proc. ', "RowUpdating" );
    const onRowUpdated    = () => console.log('event proc. ', "RowUpdated"  );
    const onRowRemoving   = () => console.log('event proc. ', "RowRemoving" );
    const onRowRemoved    = () => console.log('event proc. ', "RowRemoved"  );

    let [popupVisible, setPopupVisible]=useState(false);
    let [percentValue, setPercentValue]=useState(0);
    let [addValue, setAddValue]=useState(0);
    

    const shortMenuPopup = () =>{

        const shortMenuApplyForPercent = (e) =>{
            
            var carpan = percentValue/100+1;

            var array = []

            budgetData.map((data)=>{
                
                var temp = Object.assign({}, data);
                
                
                temp.budgetOcak    = data.actualOcak    !==0? data.actualOcak    *carpan:0;  
                temp.budgetSubat   = data.actualSubat   !==0? data.actualSubat   *carpan:0;  
                temp.budgetMart    = data.actualMart    !==0? data.actualMart    *carpan:0;  
                temp.budgetNisan   = data.actualNisan   !==0? data.actualNisan   *carpan:0;  
                temp.budgetMayis   = data.actualMayis   !==0? data.actualMayis   *carpan:0;  
                temp.budgetHaziran = data.actualHaziran !==0? data.actualHaziran *carpan:0;  
                temp.budgetTemmuz  = data.actualTemmuz  !==0? data.actualTemmuz  *carpan:0;  
                temp.budgetAgustos = data.actualAgustos !==0? data.actualAgustos *carpan:0;  
                temp.budgetEylul   = data.actualEylul   !==0? data.actualEylul   *carpan:0;  
                temp.budgetEkim    = data.actualEkim    !==0? data.actualEkim    *carpan:0;  
                temp.budgetKasim   = data.actualKasim   !==0? data.actualKasim   *carpan:0;  
                temp.budgetAralik  = data.actualAralik  !==0? data.actualAralik  *carpan:0;
                temp.budgetCurrencyCode = filter.currencyCode;
                
                if(getDetailObj(data)!==null){
                    temp.descriptionDetail=JSON.stringify(getDetailObj(data));
                }


                array.push(temp);

            })

            dispatch(updateBudgetListAction({budgetData:array,budgetDataSubDetail:null})) 

        }

        const shortMenuApplyForAdd = (e) =>{
            var array = []

            budgetData.map((data)=>{
                
                var temp = Object.assign({}, data);
                
                
                temp.budgetOcak    = data.actualOcak    !==0? data.actualOcak    +addValue:0;  
                temp.budgetSubat   = data.actualSubat   !==0? data.actualSubat   +addValue:0;  
                temp.budgetMart    = data.actualMart    !==0? data.actualMart    +addValue:0;  
                temp.budgetNisan   = data.actualNisan   !==0? data.actualNisan   +addValue:0;  
                temp.budgetMayis   = data.actualMayis   !==0? data.actualMayis   +addValue:0;  
                temp.budgetHaziran = data.actualHaziran !==0? data.actualHaziran +addValue:0;  
                temp.budgetTemmuz  = data.actualTemmuz  !==0? data.actualTemmuz  +addValue:0;  
                temp.budgetAgustos = data.actualAgustos !==0? data.actualAgustos +addValue:0;  
                temp.budgetEylul   = data.actualEylul   !==0? data.actualEylul   +addValue:0;  
                temp.budgetEkim    = data.actualEkim    !==0? data.actualEkim    +addValue:0;  
                temp.budgetKasim   = data.actualKasim   !==0? data.actualKasim   +addValue:0;  
                temp.budgetAralik  = data.actualAralik  !==0? data.actualAralik  +addValue:0;
                temp.budgetCurrencyCode = filter.currencyCode;

                if(getDetailObj(data).length>0){
                    temp.descriptionDetail=JSON.stringify(getDetailObj(data));
                }


                array.push(temp);

            })

            dispatch(updateBudgetListAction({budgetData:array,budgetDataSubDetail:null})) 
        }

        const getDetailObj =(val)=>{
            
            if( val.actualOcak   === 0 &&
                val.actualSubat  === 0 &&
                val.actualMart   === 0 &&
                val.actualNisan  === 0 &&
                val.actualMayis  === 0 &&
                val.actualHaziran=== 0 &&
                val.actualTemmuz === 0 &&
                val.actualAgustos=== 0 &&
                val.actualEylul  === 0 &&
                val.actualEkim   === 0 &&
                val.actualKasim  === 0 &&
                val.actualAralik === 0 )
                return [];

            var obj = [{
                 __KEY__      : val.foreingId
                ,currencyCode : filter.currencyCode
                ,description  : 'ilk kayıt'
                ,ocak         : val.actualOcak   
                ,subat        : val.actualSubat  
                ,mart         : val.actualMart   
                ,nisan        : val.actualNisan  
                ,mayis        : val.actualMayis  
                ,haziran      : val.actualHaziran
                ,temmuz       : val.actualTemmuz 
                ,agustos      : val.actualAgustos
                ,eylul        : val.actualEylul  
                ,ekim         : val.actualEkim   
                ,kasim        : val.actualKasim  
                ,aralik       : val.actualAralik 
                }]
            return obj;
        }

        return(
            <Popup
              visible={popupVisible}
              onHiding={()=>setPopupVisible(false)}
              dragEnabled={true}
              closeOnOutsideClick={true}
              showTitle={true}
              title="Hızlı Menü"
              width={360}
              height={240}
            >
              
              <GroupItem colCount={2} caption="Açıklamalar">
                    <SimpleItem dataField="description1" label={{text:"Açıklama-1"}}/>
                    <SimpleItem dataField="description2" label={{text:"Açıklama-2"}}/>
                    <SimpleItem dataField="description3" label={{text:"Açıklama-3"}}/>
                </GroupItem>
                <div className="column">
                    <div className="field">
                        <div className="label">Gerçekleşene Göre Artır (%)</div>
                        
                        <div className="value">
                            <NumberBox
                            value={percentValue}
                            onValueChanged={(e)=>setPercentValue(e.value)}
                            showSpinButtons={true}
                            
                            style={{float:'left'}}
                            />
                            <Button icon="check" type="success" text="" style={{float:'right'}} onClick={shortMenuApplyForPercent}/>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="field">
                        <div className="label">Gerçekleşene Göre Ekle</div>
                        
                        <div className="value">
                            <NumberBox
                             value={addValue}
                             onValueChanged={(e)=>setAddValue(e.value)}
                            showSpinButtons={true}
                            max={10000000000}
                            min={0}
                            format="#,##0.00"
                            style={{float:'left'}}
                            />
                            <Button icon="check" type="success" text="" style={{float:'right'}} onClick={shortMenuApplyForAdd}/>
                        </div>
                        
                    </div>
                </div>
            </Popup>
        )
    }

    const saveData=()=>{
        
        actualForBudgetData.budgetData.forEach(element => {
            element.branchCode=element.branchCode===null?'0':element.branchCode;
            element.budgetMainCode=element.budgetMainCode===null?'0':element.budgetMainCode;
            element.budgetSubCode=element.budgetSubCode===null?'0':element.budgetSubCode;
        })

        console.log('Data Guncel : ',
        actualForBudgetData.budgetData);
        
        dispatch(saveBudgetListAction({bugdetList:actualForBudgetData.budgetData,projectCode: filter.projectCode, budgetYear: parseInt(filter.budgetYear)}));  
    }

    //hanel6 - Hanel123*r 192.168.0.24:8724

    const detail =(props)=>{
        console.log("JSON.parse --0 ",props.data.row.data)
        var jsonString=props.data.row.data.descriptionDetail;
        if(jsonString===null || jsonString==='') jsonString="[]";

        var objArr = eval(JSON.parse(jsonString))
      
        console.log("JSON.parse",objArr)
        
        const updateDesc = (data) => {
            if(data.dataField==="description1") props.data.row.data.description1 = data.value;
            if(data.dataField==="description2") props.data.row.data.description2 = data.value;
            if(data.dataField==="description3") props.data.row.data.description3 = data.value;
            
            console.log('updated row : ',data);
        }

        const childUpdated = (data) =>{
            var ocak    =0;
            var subat   =0;
            var mart    =0;
            var nisan   =0;
            var mayis   =0;
            var haziran =0;
            var temmuz  =0;
            var agustos =0;
            var eylul   =0;
            var ekim    =0;
            var kasim   =0;
            var aralik  =0;

            data.forEach(element => {
                ocak    = ocak    + element.ocak    
                subat   = subat   + element.subat   
                mart    = mart    + element.mart    
                nisan   = nisan   + element.nisan   
                mayis   = mayis   + element.mayis   
                haziran = haziran + element.haziran 
                temmuz  = temmuz  + element.temmuz  
                agustos = agustos + element.agustos 
                eylul   = eylul   + element.eylul   
                ekim    = ekim    + element.ekim    
                kasim   = kasim   + element.kasim   
                aralik  = aralik  + element.aralik  
            });
            props.data.row.data.budgetOcak    = ocak    
            props.data.row.data.budgetSubat   = subat   
            props.data.row.data.budgetMart    = mart    
            props.data.row.data.budgetNisan   = nisan   
            props.data.row.data.budgetMayis   = mayis   
            props.data.row.data.budgetHaziran = haziran 
            props.data.row.data.budgetTemmuz  = temmuz  
            props.data.row.data.budgetAgustos = agustos 
            props.data.row.data.budgetEylul   = eylul   
            props.data.row.data.budgetEkim    = ekim    
            props.data.row.data.budgetKasim   = kasim   
            props.data.row.data.budgetAralik  = aralik  
            
            
            props.data.row.data.descriptionDetail=JSON.stringify(data);
        }

        var descData={description1:props.data.row.data.description1,description2:props.data.row.data.description2,description3:props.data.row.data.description3}

        return (<div>
                    <DetailTemplate dataSource={objArr} updateDesc={updateDesc} childUpdate={childUpdated} descData={descData} currencyCode={props.data.row.data.budgetCurrencyCode}/>
                </div>
            )
    }
    
    const openShortjob =()=>{
        setPopupVisible(true)
    }

    const mainTableRowUpdated =(data)=>{
        console.log('ROW .: ',data)
    }

    //console.log(filter)
   
    const customToolbar =(e)=> {
        e.toolbarOptions.items.unshift({
          location: 'before',
          widget: 'dxSelectBox',
          showText:'always',
          options: {
            width: 78,
            items: years(),
            displayExpr: 'value',
            valueExpr: 'value',
            value:filter.actualYear,
            onValueChanged: ({value})=>setFilter({...filter,actualYear:value})
          }
        },
        {
            location: 'before',
            widget: 'dxSelectBox',
            options: {
              width: 71,
              items: [{
                value: 'TL'
              }, {
                value: 'USD'
              }, {
                value: 'EUR'
              }],
              displayExpr: 'value',
              valueExpr: 'value',
              value: filter.currencyCode,
              onValueChanged: ({value})=>setFilter({...filter,currencyCode:value})
            }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {  
            icon: 'refresh',
            onClick: openShortjob
          }
        }
        );
    }

    return (
        <Container maxWidth="xl" style={{ marginTop: 10 }} >
            {shortMenuPopup()}
            <FabMenu saveData={{isSave:true, saveFunc:saveData}}></FabMenu>
            <Grid container spacing={1}>
                <Grid item xs={5} sm={1}></Grid>
                <Grid item xs={7} sm={2}></Grid>
            </Grid>
            <Grid container spacing={1}>
                <div style={{marginLeft:'25px'}}>
                    <BreadCrumbs linkParams={[params.projectCode,params.budgetYear]} />
                </div>
                <DxGridTable
                    customToolbarItemsPreparing={customToolbar}
                    rowUpdated={mainTableRowUpdated}
                    toolAreaSearchEnabled={true}
                    gridName='actualForBudgetTable' 
                    hasDetail={false} 
                    columns={actualForButgetTableColumns}
                    bands={actualForBudgetBandColumnBands}  
                    rows={budgetData}
                    editable={true}
                    hasMasterDetail={true}
                    childGrid={detail}
                    filteringEnabled={false}
                    masterIdField={'foreingId'}
                />

            </Grid>
        </Container>

    );
}

BudgetEdit.propTypes = {

};

