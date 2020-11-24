import React, {  useState } from 'react';

import TableCell from '@material-ui/core/TableCell';


import IconButton from '@material-ui/core/IconButton';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';


function PLTableCell(props) {

    const [open, setOpen] = useState(false);

    return (

        <TableCell className={props.cellName} key={props.columnId} align={props.columnAlign}>
            <IconButton aria-label="expand row" size="small" onClick={(e)=>{props.handleExpand(props.rootId);setOpen(open ? false : true)}}>
                {open ? <RemoveSharpIcon /> : <AddSharpIcon />}
            </IconButton>
        </TableCell>

    );
}



export default PLTableCell;