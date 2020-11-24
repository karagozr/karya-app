import React, { useEffect } from 'react';
import BreadCrumbs from "../../tools/breadCrumbs"

import { getCariReportSubGroupAction } from '../../../redux'
import { useSelector,useDispatch } from 'react-redux'
import {DxGridTable} from '../../tools/table/dxGridTable'

import {history} from '../../../helpers'

const columns = [
    // { name: 'cariKod', title: 'Cari' ,align:'left'},
    { name: 'raporGrupAd', title: 'Grup Adı' ,align:'left',fixed:true,summaryType:'count'},
    { name: 'projeKod', title: 'Proje Kod' ,align:'left'},
    { name: 'projeAd', title: 'Proje' ,align:'left'},
    { name: 'raporHesapKod', title: 'Hesap Kodu' ,align:'left'},
    { name: 'raporHesapAd', title: 'Hesap Adı' ,align:'left'},
    { name: 'paraBirim', title: 'Döviz' ,align:'left'},
    { name: 'dovizBorc', title: 'Borç' ,align:'right',dataType:'number', format:'fixedPoint',summaryType:'sum'},
    { name: 'dovizAlacak', title: 'Alacak' ,align:'right',dataType:'number', format:'fixedPoint',summaryType:'sum'},
    { name: 'dovizBakiye', title: 'Bakiye' ,align:'right',dataType:'number', format:'fixedPoint',summaryType:'sum'},  
];

const SubList = (props) => {
    const {match} = props;
    const {params} = match;

    const dispatch = useDispatch();
    const cariReportSubGroup = useSelector(x=>x.cariReportSubGroupReducers);

    useEffect(()=>{
        dispatch(getCariReportSubGroupAction({kod:params.cariKod}))
    },[dispatch])

    

    const handleClick=(row)=>{
        let { cariKod,projeKod,raporHesapKod }  = row;
        if(raporHesapKod==='')
            history.push('/mainList/'+cariKod+'/Proje/'+projeKod);
        else
            history.push('/mainList/'+cariKod+'/HesapKod/'+raporHesapKod);
    }

    return (
        <div>
             <BreadCrumbs linkParams={['MainList',params.cariKod]}/>
            <div style={{left:100}}>
                <DxGridTable
                    hasDetail={true}
                    rows={cariReportSubGroup}
                    columns={columns}
                    onClickCell={handleClick}
                    gridName={params.cariKod}
                ></DxGridTable>
            </div>
        </div>
    );
}

export default SubList;