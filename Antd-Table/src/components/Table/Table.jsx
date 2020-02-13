import React, {useLayoutEffect, useState, useRef, createRef, useEffect, useMemo} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import WidthResizer, {useResize} from "./Resizer";

import {useScroll} from "./Scroller";

import style from './Table.scss';

const findElementByAttribute = (element, attribute) => {

    let usedElement = element;
    let result = null;
    if (!(element instanceof HTMLElement)) return result;

    while (usedElement !== document.documentElement) {
        if (usedElement.hasAttribute(attribute)) {
            result = usedElement;
            break;
        }
        usedElement = usedElement.parentNode;
    }

    return result;
};

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

    const resizeManager = useMemo(() => new WidthResizer(props.columns), [props.columns]);

    const {onScroll, scrollData} = useScroll();

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
                                style={{
                                    width: resizeManager.getWidth(column.key)
                                }}
                                className={style.title}
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
                                    width: resizeManager.getWidth(column.key)
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
            <div
                className={style.header}
            >
                {renderTitles()}
            </div>
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