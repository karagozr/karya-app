import React, { useState,useRef, useEffect }  from 'react';
import PropTypes from 'prop-types';
import PivotGrid, {
    FieldChooser,
    FieldPanel,
    Scrolling,
    StateStoring,
    Export
} from 'devextreme-react/pivot-grid';
import { useWindowDimensions } from '../../tools/useWindowDimensions'
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import './pivotTable.css'


const { innerWidth: width, innerHeight: height } = window;

const filterBuilderPopupPosition = {
    of: window,
    at: 'top',
    my: 'top',
    offset: { y: 10 }
  };


const PivotTable=({layout=[],dataSource,filter,getLayout,pivotRef})=>{
    
    

    const onContextMenuPreparing = (e) => {
        var sourceField = e.field;

        if (sourceField) {
            if (!sourceField.groupName || sourceField.groupIndex === 0) {
                e.items.push({
                    text: 'Hide field',
                    onItemClick: function () {
                        var fieldIndex;
                        if (sourceField.groupName) {
                            fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
                        } else {
                            fieldIndex = sourceField.index;
                        }

                        dataSource.field(fieldIndex, {
                            area: null
                        });
                        dataSource.load();
                    }
                });
            }

            if (sourceField.dataType === 'number') {
                var menuItems = [];

                e.items.push({ text: 'Summary Type', items: menuItems });
                ['Sum', 'Avg', 'Min', 'Max'].forEach(summaryType => {
                    var summaryTypeValue = summaryType.toLowerCase();

                    menuItems.push({
                        text: summaryType,
                        value: summaryType.toLowerCase(),
                        onItemClick: function (args) {
                            setSummaryType(args, sourceField);
                        },
                        selected: e.field.summaryType === summaryTypeValue
                    });
                });
            }
        }

        
    }

    const setSummaryType = (args, sourceField) => {
        dataSource.field(sourceField.index, {
            summaryType: args.itemData.value
        });

        dataSource.load();
    }


    const design = new PivotGridDataSource({
        fields: layout,
        store: dataSource,
        //filter: 
    });


    return (
        <div>
            <PivotGrid
                ref={pivotRef}
                id="sales"
                dataSource={design}
                allowSortingBySummary={true}
                allowSorting={true}
                allowFiltering={true}
                allowExpandAll={true}
                showBorders={true}
                height={height - height * 0.1}
                onContextMenuPreparing={onContextMenuPreparing}
            >
                <FieldPanel
                    showColumnFields={width>720}
                    showDataFields={width>720}
                    showFilterFields={width>720}
                    showRowFields={width>720}
                    allowFieldragging={true}
                    visible={true}                    
                />
                {/* <Scrolling mode="virtual" /> */}
                <Export enabled={true} fileName="Pivot Rapor" />
                <FieldChooser height={height - height * 0.30} width={width > 1000 ? 800 : width - width * 0.10} />
            </PivotGrid>
        </div>
    );
}

export default React.memo(PivotTable);

PivotTable.propTypes = {
    layout: PropTypes.array,
    createReducer: PropTypes.array,
    getLayout:PropTypes.func
};