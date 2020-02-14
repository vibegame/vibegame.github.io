import React, {useLayoutEffect, useState, useRef, createRef, useEffect, useMemo} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import {useScroll} from "./Scroller";

import TableStorage from "./TableStorage";

import style from './Table.scss';

const Cell = props => {
    return (
        <span
            {...props}
            className={classNames(style.cell, props.className)}
        />
    );
};

const Title = props => {
    return (
        <span
            {...props}
            className={classNames(style.title, props.className)}
        />
    );
};

const Table = props => {

    const {onScroll, scrollData} = useScroll();
    const storage = useMemo(() => (new TableStorage({columns: props.columns})), [props.columns]);

    const renderTitles = () => {
        return (
            <div
                className={style.header}
                style={{
                    transform: `translate(0, ${scrollData.top}px)`
                }}
            >
                {
                    props.columns.map(column => {
                        return (
                            <Title
                                key={column.key}
                                className={style.title}
                                style={{
                                    width: storage.getWidth(column.key)
                                }}
                            >
                                {column.title}
                            </Title>
                        );
                    })
                }
            </div>
        );
    };

    const renderRows = () => {

        return props.data.map(row => {
            return (
                <div
                    key={row.key}
                    className={classNames(style.row)}
                >
                    {
                        props.columns.map(column => (
                            <Cell
                                key={column.key}
                                style={{
                                    width: storage.getWidth(column.key)
                                }}
                            >
                                {column.render(row)}
                            </Cell>
                        ))
                    }
                </div>
            );
        });

    };

    return (
        <div
            className={style.table}
            onScroll={onScroll}
        >
            {renderTitles()}
            <div
                className={style.body}
            >
                {renderRows()}
            </div>
        </div>
    );

};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape(
            {
                key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                width: PropTypes.number.isRequired,
                maxWidth: PropTypes.number.isRequired,
                minWidth: PropTypes.number.isRequired,
                title: PropTypes.string,
                className: PropTypes.string,
                render: PropTypes.func.isRequired
            }
        )
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })),
    fixedHeader: PropTypes.bool
};

Table.defaultProps = {
    data: [],
    columns: {}
};


export default Table;