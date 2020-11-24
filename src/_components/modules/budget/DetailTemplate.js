import React from 'react';
import { DataGrid, Column,Editing } from 'devextreme-react/data-grid';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import service from './data.js';
import { DxGridTable } from '../../tools/table/dxGridTable'
import { updateBudgetListAction } from '../../../redux'
import { useDispatch } from 'react-redux'
import TextBox from 'devextreme-react/text-box';
import 'devextreme-react/text-area';
import { Form, GroupItem, SimpleItem,Item } from 'devextreme-react/form';


const currencyCodes=[{code:'TL'},{code:'USD'},{code:'EUR'}]

const actualForButgetTableColumns = [
  { name: 'description',   title: 'Açıklama',  align: 'left',  dataType: 'string'  },
  //{ name: 'currencyCode',  title: 'Döviz',     align: 'left',  dataType: 'string', allowEditing:true,  editor:{name:'lookUp', dataSource:currencyCodes, valueField:'code',displayField:'code'} },
  { name: 'ocak',          title: 'Ocak',      align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'subat',         title: 'Şubat',     align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'mart',          title: 'Mart',      align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'nisan',         title: 'Nisan',     align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'mayis',         title: 'Mayis',     align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'haziran',       title: 'Haziran',   align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'temmuz',        title: 'Temmuz',    align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'agustos',       title: 'Ağustos',   align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'eylul',         title: 'Eylül',     align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'ekim',          title: 'Ekim',      align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'kasim',         title: 'Kasım',     align: 'right', dataType: 'number', format: 'fixedPoint' },
  { name: 'aralik',        title: 'Aralık',    align: 'right', dataType: 'number', format: 'fixedPoint' },

]

const DetailTemplate = (props) => {
  const {dataSource, updateDesc, descData} = props;

  const rowUpdated = (vals)=>{
    console.log('data ',vals)
    props.childUpdate(dataSource);
  }
  
  const rowInserting = ({data})=>{
   
    data.ocak    = data.ocak     === undefined?0:data.ocak    
    data.subat   = data.subat    === undefined?0:data.subat      
    data.mart    = data.mart     === undefined?0:data.mart    
    data.nisan   = data.nisan    === undefined?0:data.nisan  
    data.mayis   = data.mayis    === undefined?0:data.mayis  
    data.haziran = data.haziran  === undefined?0:data.haziran
    data.temmuz  = data.temmuz   === undefined?0:data.temmuz 
    data.agustos = data.agustos  === undefined?0:data.agustos
    data.eylul   = data.eylul    === undefined?0:data.eylul   
    data.ekim    = data.ekim     === undefined?0:data.ekim    
    data.kasim   = data.kasim    === undefined?0:data.kasim   
    data.aralik  = data.aralik   === undefined?0:data.aralik 
  }

  const formItems =  [
      'description1', 'description2', 'description3'
    ];

  
  return (
    <React.Fragment>
       <Form formData={descData} colCount={1} onFieldDataChanged={updateDesc}>
                <GroupItem colCount={3} caption="Açıklamalar">
                    <SimpleItem dataField="description1" label={{text:"Açıklama-1"}}/>
                    <SimpleItem dataField="description2" label={{text:"Açıklama-2"}}/>
                    <SimpleItem dataField="description3" label={{text:"Açıklama-3"}}/>
                </GroupItem>
            </Form>
      <DxGridTable 
        gridName='actualForBudgetDetailTable' 
        hasDetail={false} 
        columns={actualForButgetTableColumns} 
        rows={dataSource}
        editable={true}
        hasMasterDetail={false}
        toolAreaEnabled={false}
        filteringEnabled={false}
        allowAdd={true}
        heightMultiper={0.25}
        rowInserting={rowInserting}
        rowUpdated={rowUpdated}
        rowInserted={rowUpdated}
        rowDeleted={rowUpdated}
        allowDeleting={true}
        />
    </React.Fragment>
  )
  
}

export default DetailTemplate;
