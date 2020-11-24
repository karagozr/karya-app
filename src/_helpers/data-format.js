import React from 'react';
import NumberFormat from 'react-number-format';

const percentage = value =>(<NumberFormat value={value} displayType={'text'} format={v => (Number(v) * 100).toFixed(1) + "%"} />)
const money = (value, fixedValue) =>(<NumberFormat value={value.toFixed(fixedValue)} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />)

export const dataFormat = {
    percentage,
    money
};


