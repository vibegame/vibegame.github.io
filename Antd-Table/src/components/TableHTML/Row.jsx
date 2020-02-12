import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {logger} from "./TableHTML";

import style from './Row.scss';

const Row = props => {

    useEffect(() => {
        logger(`Row ${props.index} is updated`);
    });

    return (
        <tr
             className={style.row}
        >
            {
                props.data.map(data => {
                    return (
                        <td
                            className={style.cell}
                            key={data.dataIndex}
                            style={data.style}
                        >
                            {data.content}
                        </td>
                    );
                })
            }
        </tr>
    );

};

Row.propTypes = {
    data: PropTypes.array,
    index: PropTypes.any,
    style: PropTypes.object
};

export default Row;