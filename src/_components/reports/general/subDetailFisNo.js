import React, {  useEffect } from 'react';
import BreadCrumbs from "../../tools/breadCrumbs"
import { getCariReportSubGroupDetailFisNoAction } from '../../../redux'
import { useSelector,useDispatch } from 'react-redux'
import {DxGridTable} from '../../tools/table/dxGridTable'


const columns = [
    { name: 'tarih',            title: 'Tarih' ,        align:'left',dataType:'date', fixed:true},
    { name: 'fisNo',            title: 'Fiş No' ,       align:'left',summaryType:'count'},
    { name: 'aciklama',         title: 'Açıklama' ,     align:'left'},
    { name: 'raporHesapAd',     title: 'Hesap Adi' ,    align:'left'},
    { name: 'referansKod',      title: 'Ref. Kod' ,     align:'left'},
    { name: 'referansAd',       title: 'Ref. Adı' ,     align:'left'},
    { name: 'paraBirim',        title: 'Döviz' ,        align:'right'},
    { name: 'dovizBorc',        title: 'Borç' ,         align:'right',dataType:'number', format:'fixedPoint',summaryType:'sum'},
    { name: 'dovizAlacak',      title: 'Alacak' ,       align:'right',dataType:'number', format:'fixedPoint',summaryType:'sum'},
    { name: 'dovizBakiye',      title: 'Bakiye' ,       align:'right',dataType:'number', format:'fixedPoint',summaryType:'sum'},
    { name: 'sube',             title: 'Şube Adı' ,     align:'left'}
];

const SubDetailFisNo = (props) => {
    const {match} = props;
    const {params} = match;

    const dispatch = useDispatch();
    const data = useSelector(x=>x.cariReportSubGroupDetailFisNoReducers);

    useEffect(()=>{
        dispatch(getCariReportSubGroupDetailFisNoAction({fisNo:params.fisNo,subeKod:params.subeKod}))
    },[dispatch])


    const handleClick=(row)=>{
        // let { cariKod,projeKod,raporHesapKod }  =row;
        // if(raporHesapKod==='')
        //     history.push('/mainList/'+cariKod+'/'+projeKod);
        // else
        //     history.push('/mainList/'+cariKod+'/'+raporHesapKod);
    }
    

    const bakiyeUpdate=(row,bakiye)=>{
        return 0;//return row.dovizBorc-row.dovizAlacak+bakiye;
    }


    console.log('params : ',params)

    return (
        <div>
            <BreadCrumbs linkParams={['MainList','SubList',params.projeKod,params.raporHesapKod]}/>
            <div style={{left:100}}>
                <DxGridTable
                    hasDetail={false}
                    columns={columns}
                    rows={data}
                    onClickCell={handleClick}
                    calculateCellValue={bakiyeUpdate}
                    calculatedColumn='dovizBakiye'
                    gridName={'FisNoDetail'}
                ></DxGridTable>
            </div>
        </div>
    );
}

export default SubDetailFisNo;