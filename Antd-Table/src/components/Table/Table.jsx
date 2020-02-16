import React, {useLayoutEffect, useState, useRef, createRef, useEffect, useMemo} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import {useScroll} from "./Scroller";

import Storage from "./Storage";

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

    const storage = useMemo(() => new Storage(props.columns), [props.columns]);

    const [widths, _updateWidths] = useState(() => storage.getWidths());

    const [resizingColumn, setResizingColumn] = useState(null);

    const [draggedColumn, setDraggedColumn] = useState(null);

    const updateWidths = () => {
        _updateWidths(storage.getWidths());
    };

    const changeWidth = ({key, width}) => {
        storage.changeWidth({key, width});
        updateWidths();
    };

    const removeResizingColumn = () => {
        setResizingColumn(null);
    };
    const removeDraggedColumn = () => {
        setDraggedColumn(null);
    };

    const createResizingColumn = ({startPointX, key}) => {
        setResizingColumn({
            startPointX,
            key
        });
    };
    const createDraggedColumn = ({startX, key}) => {
        setDraggedColumn({
            startX,
            key
        });
    };
    const changeDraggedColumnPosition = position => {
        setDraggedColumn(
            {
                ...draggedColumn,
                position
            }
        );
    };

    const resizeStart = (event) => {
        event.stopPropagation();


        const target = event.currentTarget;
        const key = target.dataset.resizeKey;
        const startPointX = event.clientX;

        createResizingColumn({key, startPointX});
    };

    const onResize = (event) => {

        event.preventDefault();
        const mouseX = event.clientX;

        const columnWidth = widths[resizingColumn.key];
        const distance = mouseX - resizingColumn.startPointX;

        changeWidth({
            key: resizingColumn.key,
            width: columnWidth + distance
        });

    };

    const resizeEnd = () => {
        props.onChangeWidth && props.onChangeWidth({
            key: resizingColumn.key,
            width: widths[resizingColumn.key]
        });
        removeResizingColumn();
    };

    const dragStart = (event) => {
        const target = event.currentTarget;
        const key = target.dataset.dragKey;
        const mouseX = event.clientX;

        createDraggedColumn({
            startX: mouseX,
            key
        });

    };

    const onDragMove = (event) => {
        event.preventDefault();
        const mouseX = event.clientX;
        const position = mouseX - draggedColumn.startX;
        changeDraggedColumnPosition(position);
    };

    const dragEnd = () => {
        removeDraggedColumn();
    };

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
                                    width: widths[column.key],
                                    transform: `translate(${(draggedColumn && draggedColumn.key === column.key) ? draggedColumn.position : 0}px,0)`
                                }}
                                data-drag-key={column.key}
                                onMouseDown={dragStart}
                            >
                                {column.title}
                                <span
                                    data-resize-key={column.key}
                                    onMouseDown={resizeStart}
                                    className={style.resizer}
                                />
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
                                    width: widths[column.key],
                                    transform: `translate(${(draggedColumn && draggedColumn.key === column.key) ? draggedColumn.position : 0}px,0)`
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

    useLayoutEffect(() => {
        if (resizingColumn) {
            window.addEventListener('mousemove', onResize);
            window.addEventListener('mouseup', resizeEnd);
        }
        return () => {
            if (resizingColumn) {
                window.removeEventListener('mousemove', onResize);
                window.removeEventListener('mouseup', resizeEnd);
            }
        };
    }, [resizingColumn]);
    useLayoutEffect(() => {
        if (draggedColumn) {
            window.addEventListener('mousemove', onDragMove);
            window.addEventListener('mouseup', dragEnd);
        }
        return () => {
            if (draggedColumn) {
                window.removeEventListener('mousemove', onDragMove);
                window.removeEventListener('mouseup', dragEnd);
            }
        };
    }, [draggedColumn]);

    useEffect(() => {
        updateWidths();
    }, [storage]);

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
    fixedHeader: PropTypes.bool,
    onChangeWidth: PropTypes.func
};

Table.defaultProps = {
    data: [],
    columns: {}
};


export default Table;