import React, { useEffect, useState } from 'react';
import DataGrid, {
    Scrolling, Sorting, LoadPanel, FilterRow, Column,
    HeaderFilter,
    SearchPanel,
    toolAreaEnabled,
    ColumnFixing,
    Summary, TotalItem,
    Export,
    Editing,
    RequiredRule,
    Lookup,
    MasterDetail,
    StateStoring, FilterBuilderPopup, FilterPanel
}
    from 'devextreme-react/data-grid';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { ConstantLineStyle } from 'devextreme-react/chart';
import './dxGridTable.css'

const { innerWidth: width, innerHeight: height } = window;
const filterBuilderPopupPosition = {
    of: window,
    at: 'top',
    my: 'top',
    offset: { y: 10 }
};


export const DxGridTable = (props) => {


    const { gridName
        , fixedLeftColumn
        , fixedRightColumn
        , rows
        , columns
        , bands
        , editable
        , onClickCell
        , hasDetail
        , calculateCellValue
        , calculatedColumn
        , heightMultiper
        , childGrid
        , toolAreaEnabled,toolAreaSearchEnabled
        , filteringEnabled
        , hasMasterDetail
        , allowAdd
        , masterIdField
        , editor
        ,allowDeleting 
        ,rowUpdated,rowInserted,rowDeleted,rowInserting
        ,customToolbarItemsPreparing } = props;



    const cssClasName={
        backgroundColor:'yellow',
        
    }
        
    let calcVal = 0;
    const calculateCell = (row) => {
        calcVal = calculateCellValue(row, calcVal);
        return calcVal;
    }

    const renderGridCell = ({ row }) => {
        return <a href='' onClick={(e) => onClickCell(row.data)}>Detay</a>;
    }

    const hasBand = bands.length > 0 ? true : false;

    const editCell = {

    }

    return (
        <Container maxWidth="xl" style={{ marginTop: 10 }}>
            <DataGrid
                style={{ backgroundColor: '#ffffe1' }}
                elementAttr={{
                    id: "gridContainer"
                }}
                onToolbarPreparing={customToolbarItemsPreparing}
                selection={{ mode: 'single' }} 
                onRowUpdated={rowUpdated}
                onRowRemoved={rowDeleted}
                onRowInserted={rowInserted}
                onRowInserting={rowInserting}
                keyExpr={masterIdField}
                dataSource={props.rows}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                columnResizingMode={'nextColumn'}
                allowColumnReordering={true}
                columnMinWidth={50}
                columnAutoWidth={true}
                style={{ height: (height * 0.85) * heightMultiper }}
                onCellPrepared={() => { calcVal = 0 }}
                onExporting={() => { calcVal = 0 }}
                //rowAlternationEnabled={true}
                //rowRender={DxGridRow}
            >
                {toolAreaEnabled ? (<toolAreaEnabled enabled={false} />) : (null)}
                {toolAreaEnabled ? (<Export enabled={true} allowExportSelectedData={true} />) : (null)}
                {toolAreaSearchEnabled&&width>720 ? (<SearchPanel visible={true} width={240} placeholder="Ara..." />) : (null)}

                {filteringEnabled ? (<FilterRow visible={true} />) : (null)}
                {filteringEnabled ? (<FilterPanel visible={true} />) : (null)}
                {filteringEnabled ? (<FilterBuilderPopup position={filterBuilderPopupPosition} />) : (null)}
                {filteringEnabled ? (<HeaderFilter visible={true} />) : (null)}

                <StateStoring enabled={true} type="localStorage" storageKey={gridName} />
                {
                    columns.filter(x => !bands.map(({ bandName }) => bandName).includes(x.bandName)).map(({ editor,name, title, align, dataType, format, fixed, width,isRequired, allowEditing }, index) => {

                        if (name === calculatedColumn) {
                            return (
                                <Column key={index}
                                    dataField={name}
                                    fixed={fixed}
                                    caption={title}
                                    dataType={dataType}
                                    format={format}
                                    cssClass={allowEditing?'editCell':''}
                                    allowEditing={allowEditing}
                                    style={{ textAlign: align }}
                                    calculateCellValue={calculateCell}>
                                    {isRequired?(<RequiredRule />):null}
                                    <HeaderFilter allowSearch={true} />
                                </Column>
                            )
                        } else {
                            return (
                                <Column key={index}
                                    dataField={name}
                                    fixed={fixed}
                                    caption={title}
                                    dataType={dataType}
                                    format={format}
                                    cssClass={allowEditing?'editCell':''}
                                    allowEditing={allowEditing}
                                    style={{ textAlign: align }}>
                                    <HeaderFilter allowSearch={true} />
                                    {isRequired?(<RequiredRule />):null}
                                    {editor!==undefined?(<Lookup dataSource={editor.dataSource} valueExpr={editor.valueField} displayExpr={editor.displayField} />):null}
                                </Column>
                            )
                        }

                    })
                }
                {
                    bands.length > 0 ? bands.map(({ bandName, bandCaption }, i) => {
                        var bandsColumn = columns.filter(x => x.bandName === bandName)

                        return (<Column key={i} caption={bandCaption}>
                            {
                                bandsColumn.map(({ editor,name, title, align, dataType, format, fixed, width,allowEditing,isRequired }, index) => {

                                    if (name === calculatedColumn) {
                                        return (
                                            <Column key={index}
                                                dataField={name}
                                                fixed={fixed}
                                                caption={title}
                                                dataType={dataType}
                                                format={format}
                                                cssClass={allowEditing?'editCell':''}
                                                allowEditing={allowEditing}
                                                style={{ textAlign: align }}
                                                calculateCellValue={calculateCell}>
                                                <HeaderFilter allowSearch={true} />
                                                {isRequired?(<RequiredRule />):null}
                                            </Column>
                                        )
                                    } else {
                                        return (
                                            <Column key={index}
                                                dataField={name}
                                                fixed={fixed}
                                                caption={title}
                                                dataType={dataType}
                                                format={format}
                                                cssClass={allowEditing?'editCell':''}
                                                allowEditing={allowEditing}
                                                style={{ textAlign: align }}>
                                                <HeaderFilter allowSearch={true} />
                                                {isRequired?(<RequiredRule />):null}
                                                {editor!==undefined?(<Lookup dataSource={editor.dataSource} valueExpr={editor.valueField} displayExpr={editor.displayField} />):null}
                                            </Column>
                                        )
                                    }

                                })
                            }
                        </Column>)


                    }) : null
                }
                {hasDetail ? (<Column dataField="detay" caption="" alignment="center" cellRender={renderGridCell} />) : null}
                <Summary>
                    {
                        props.columns.map(({ name, format, fixed, width, summaryType }, index) => {
                            console.log(fixed, width)
                            if (summaryType === 'count') {
                                return (
                                    <TotalItem
                                        key={index}
                                        column={name}
                                        summaryType="count" />
                                )
                            } else if (summaryType === 'sum') {
                                return (
                                    <TotalItem
                                        key={index}
                                        column={name}
                                        summaryType="sum"
                                        valueFormat={format} />
                                )
                            }

                        })
                    }

                </Summary>

                <Sorting mode="none" />

                <ColumnFixing enabled={true} />
                <Scrolling mode="infinite" />
                {editable ? (<Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={allowDeleting}
                    allowAdding={allowAdd} />) : (null)}
                {hasMasterDetail ? (<MasterDetail
                    enabled={true}
                    component={childGrid}
                />) : (null)}
                <LoadPanel enabled={false} />
            </DataGrid>
        </Container>
    );
}

export default React.memo(DxGridTable);

function customizeColumns(columns) {
    if (columns.length === 0) return;
    columns[0].textAlign = 'right';
}

DxGridTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        align: PropTypes.string,
        dataType: PropTypes.string,
        allowEditing:PropTypes.bool,
        isRequired:PropTypes.bool,
    })).isRequired,
    bands: PropTypes.arrayOf(PropTypes.shape({
        bandName: PropTypes.string.isRequired,
        bandCaption: PropTypes.string.isRequired
    })),
    editor:PropTypes.shape({
        name:PropTypes.string.isRequired,
        dataSource:PropTypes.array.isRequired,
        valueField:PropTypes.string.isRequired,
        displayField:PropTypes.string.isRequired
    }),
    gridName: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    hasMasterDetail: PropTypes.bool,
    hasDetail: PropTypes.bool,
    calculatedColumn: PropTypes.string,
    onClickCell: PropTypes.func,
    fixedLeftColumn: PropTypes.array,
    fixedRightColumn: PropTypes.array,
    hiddenColumn: PropTypes.array,
    heightMultiper: PropTypes.number,
    calculateCellValue: PropTypes.func,
    hiddenColumnSave: PropTypes.func,
    childGrid: PropTypes.any,
    editable: PropTypes.bool,
    allowAdd: PropTypes.bool,
    masterIdField: PropTypes.string,
    rowUpdated: PropTypes.func,
    rowInserted: PropTypes.func,
    rowDeleted: PropTypes.func,
    rowInserting: PropTypes.func,
    customToolbarItemsPreparing: PropTypes.func,
    toolAreaEnabled: PropTypes.bool,
    toolAreaSearchEnabled: PropTypes.bool,
    filteringEnabled: PropTypes.bool,
    allowDeleting:PropTypes.bool
};

DxGridTable.defaultProps = {
    heightMultiper: 1,
    bands: [],
    hasMasterDetail: false,
    editable: false,
    toolAreaEnabled: true,
    filteringEnabled: true,
    allowAdd: false,
    rowUpdated:()=>console.log(),
    rowInserted:()=>console.log(),
    rowDeleted:()=>console.log(),
    rowInserting:()=>console.log(),
    customToolbarItemsPreparing:null,
    toolAreaSearchEnabled:true,
    editor:null,
    allowDeleting:false
};