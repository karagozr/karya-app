import React, {  useEffect } from 'react';
import BreadCrumbs from "../../tools/breadCrumbs"
import { getCariReportSubGroupDetailAction } from '../../../redux'
import { useSelector,useDispatch } from 'react-redux'
import {DxGridTable} from '../../tools/table/dxGridTable'
import {history} from '../../../helpers'

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

const SubDetail = (props) => {
    const {match} = props;
    const {params} = match;

    const dispatch = useDispatch();
    const cariReportSubGroupDetail = useSelector(x=>x.cariReportSubGroupDetailReducers);

    useEffect(()=>{
        dispatch(getCariReportSubGroupDetailAction({cariKod:params.cariKod,projeKod:params.projeKod,raporHesapKod:params.raporHesapKod}))
    },[dispatch])


    const handleClick=(row)=>{
        var subeKod = '0'

        let { fisNo, raporHesapKod }  = row;
        if(raporHesapKod==='')
            history.push(history.location.pathname+'/FisDetail/'+fisNo+'/'+subeKod);
        else
            history.push(history.location.pathname+'/FisDetail/'+fisNo+'/'+subeKod);
    }
    
    const bakiyeUpdate=(row,bakiye)=>{
        return row.dovizBorc-row.dovizAlacak+bakiye;
    }

    return (
        <div>
            <BreadCrumbs linkParams={['MainList',params.cariKod,params.projeKod,params.raporHesapKod]}/>
            <div style={{left:100}}>
                <DxGridTable
                    hasDetail={true}
                    columns={columns}
                    rows={cariReportSubGroupDetail}
                    onClickCell={handleClick}
                    calculateCellValue={bakiyeUpdate}
                    calculatedColumn='dovizBakiye'
                    gridName={(params.projeKod||params.raporHesapKod)?params.cariKod+'P':params.cariKod}
                ></DxGridTable>
            </div>
        </div>
    );
}

export default SubDetail;