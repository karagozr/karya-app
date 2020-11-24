import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useGetProjectsBudgetList } from '../../../redux/hooks'
import List from 'devextreme-react/list';
import './budgetList.css'
import SelectBox from 'devextreme-react/select-box';
import {history} from '../../../helpers'
const { innerWidth: width, innerHeight: height } = window;

const years = () => {
    var currentYear = new Date().getFullYear(), years = [];
    var startYear = 2020;  
    while ( startYear <= currentYear+1 ) {
        years.push(startYear++);
    }   
    return years;
}


export const BudgetList = (props) => {

    var thisYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear]=useState(thisYear)

    const budgetList = useGetProjectsBudgetList({ budgetYear: selectedYear })


    const dataSourceOptions = {
        store: budgetList,
        searchExpr: ['projectName', 'projectCode']
    };

    const renderListItem = (item) => {
        return (
            <div >
                {item.status === '1' ?
                    (
                        <div className="project-planned-budget">
                            <div className="name">{item.projectCode} - {item.projectName}</div>
                            <div className="status">Büçe Planı Oluştruldu</div>
                        </div>

                    ) : (
                        <div className="project-notplanned-budget">
                            <div className="name">{item.projectCode} - {item.projectName}</div>
                            <div className="status">Bütçe Yok</div>
                        </div>
                    )}

            </div>
        );
    }

    const handleYearChanged =(val)=>{
        console.log(val)
        setSelectedYear(val.selectedItem)
    }

    const clickHandle =({itemData})=>history.push('/budgetEdit/'+itemData.projectCode+'/'+selectedYear);


    return (
        <React.Fragment>
            <div className="left" >
                <h4 style={{marginTop:0, marginBottom:10, textAlign:'center'}}>Bütçe Durum - Proje Listesi</h4>
            <SelectBox items={years()} onSelectionChanged={handleYearChanged} defaultValue={thisYear}/>
                <br></br>
                <List
                style={{ height: height * 0.65 }}
                    selectionMode="single"
                    dataSource={dataSourceOptions}
                    //grouped={true}
                    //searchEnabled={true}
                    //selectedItemKeys={this.state.selectedItemKeys}
                    //onSelectionChanged={this.handleListSelectionChange}
                    onItemClick={clickHandle}
                    itemRender={renderListItem}
                //groupRender={renderListGroup}
                //elementAttr={listAttrs}
                />
            </div>


        </React.Fragment>
    );
}

BudgetList.propTypes = {

};