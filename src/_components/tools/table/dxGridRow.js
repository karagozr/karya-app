import React from "react";

const formatDate = new Intl.DateTimeFormat("en-US").format;

export default function DxGridRow(rowInfo) {
  console.log(rowInfo);
  return (
    <tbody className={`dx-table dx-row ${rowInfo.rowIndex % 2 ? "dx-row-alt" : ""}`}>
      <tr className="main-row">
        {
            Object.keys(rowInfo.data).map((key,i)=>{
                if(rowInfo.columns[i].dataType==='date'){
                    return(<td>{formatDate(new Date(rowInfo.data[key]))}</td>)
                }else if(rowInfo.columns[i].dataType==='number'){
                    return(<td style={{textAlign:'right'}}>{rowInfo.data[key].toFixed(2)}</td>)
                }else{
                    return(<td>{rowInfo.data[key]}</td>)
                }
            }
            )
            
                
        }
        
      </tr>
    </tbody>
  );
}
