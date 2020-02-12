import React, {useEffect, useRef, useState, useReducer, createRef} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import style from './Table.scss';
import Row from "./Row";
import {initialState, reducer, SET_TBODY_TABLE_WIDTH} from "./reducer";

export const logger = (message, status = 'primary') => {
    let color = '#1f1';
    const RUN = true;

    switch (status) {
        case 'error':
            color = '#FF4141';
            break;
        case 'success':
            color = '#5DEB84';
            break;
        case 'warn':
            color = '#FFBF75';
            break;
        case 'primary':
            color = '#8790E8';
            break;
        default:
            color = '#1f1';
    }

    RUN && console.log(`%c${message}`, `font-weight: bold; color: ${color}; font-style: italic;`);
};

const TableHTML = props => {

    const ref_tbody_table = createRef();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        logger('TableHTML is updated');
    });

    useEffect(() => {
        dispatch({
            type: SET_TBODY_TABLE_WIDTH,
            payload: ref_tbody_table.current.offsetWidth
        });
    }, [props.data, props.dataColumns]);

    const renderBody = () => (
        <tbody>
        {
            props.data.map((row) => {
                return (
                    <Row
                        data={props.dataColumns.map(column => ({
                            dataIndex: column.dataIndex,
                            content: row[column.dataIndex],
                            style: {
                                maxWidth: column.width,
                                minWidth: column.width,
                                width: column.width
                            }
                        }))}
                        index={row.key}
                        key={row.key}
                    />);
            })
        }
        </tbody>
    );

    const renderHeader = () => (
        <thead>
        <tr>
            {
                props.dataColumns.map(column => (
                    <th
                        className={classNames(style.sbbol_table_title)}
                        key={column.dataIndex}
                    >
                        {column.title}
                    </th>
                ))
            }
        </tr>
        </thead>
    );

    const renderColgroup = () => (
        <colgroup>
            {
                props.dataColumns.map(column => (
                    <col
                        key={column.dataIndex}
                        style={{
                            maxWidth: column.width,
                            minWidth: column.width,
                            width: column.width
                        }}
                    />
                ))
            }
        </colgroup>
    );

    return (
        <div className={style.sbbol_table_container}>
            <div className={style.wrapper}>
                <div className={style.sbbol_table_container_titles} style={{width: state.tbodyTableWidth || 'auto'}}>
                    <table className={classNames(style.sbbol_table_titles, style.sbbol_table_fixed)}>
                        {renderColgroup()}
                        {renderHeader()}
                    </table>
                </div>
            </div>
            <div className={style.sbbol_table_container_body}>
                <table className={style.sbbol_table_fixed} ref={ref_tbody_table}>
                    {renderBody()}
                </table>
            </div>
        </div>
    );
};


TableHTML.propTypes = {
    data: PropTypes.array,
    dataColumns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.node,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        dataIndex: PropTypes.string,
    })),
};
TableHTML.defaultProps = {};

export default TableHTML;