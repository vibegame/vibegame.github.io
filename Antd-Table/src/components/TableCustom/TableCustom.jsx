import React, {useLayoutEffect, useState, useRef, createRef, useEffect} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import style from './TableCustom.scss';

const convertArrayToObjectByProp = (array, prop) => {
    const object = {};
    array.forEach(element => {
        object[element[prop]] = {...element};
        delete object[element[prop]][prop];
    });
    return object;
};

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
            className={classNames(props.className)}
            key={props.dataIndex}
            style={props.style}
            data-column-index={props.dataIndex}
        >
            {props.children}
        </span>
    );
};

const TableCustom = props => {

    const getWidthsFromColumns = () => {
        const widths = {};
        props.columns.forEach(column => widths[column.dataIndex] = column.width);
        return widths;
    };

    const getOrdersFromColumns = () => {
        const orders = {};
        props.columns.forEach((column, order) => orders[column.dataIndex] = order);
        return orders;
    };

    const getSortersFromColumns = () => {

        const sorters = {};
        props.columns.forEach((column) => {

            if (column.sorter) {
                sorters[column.dataIndex] = {
                    count: column.sorter.sortCalled || 0,
                    onSort: column.sorter.onSort,
                    trigger: column.sorter.trigger
                };
            }

        });
        return sorters;
    };

    const [columnsByDataIndex, setColumnsByDataIndex] = useState(() => convertArrayToObjectByProp(props.columns, 'dataIndex'));
    const [dataByKey, setDataByKey] = useState(() => convertArrayToObjectByProp(props.data, 'key'));

    const [widths, setWidths] = useState(() => getWidthsFromColumns());
    const [orders, setOrders] = useState(() => getOrdersFromColumns());

    const refTable = useRef(null);
    const refTableBody = useRef(null);
    const refsRows = useRef(null);
    const refTitles = useRef(null);
    const refDraggingTitle = useRef(null);
    const refExpand = useRef(null);

    const [rowsHeights, setRowsHeights] = useState(null);
    const [draggedColumn, setDraggedColumn] = useState(null);
    const [droppableColumn, setDroppableColumn] = useState(null);
    const isMoving = useRef(false);

    const [resizingColumn, setResizingColumn] = useState(null);
    const isResizing = useRef(false);

    const [sorters, setSorters] = useState(getSortersFromColumns());

    const [heightFixedHeader, setHeightFixedHeader] = useState(0);

    const [expand, setExpand] = useState(null);
    const [expandHeight, setExpandHeight] = useState(null);
    const [expandTop, setExpandTop] = useState(null);
    const lastExpandKey = useRef(null);

    const [tableScrollTop, setTableScrollTop] = useState(0);
    const [tableScrollLeft, setTableScrollLeft] = useState(0);

    const onDragStart = (event) => {

        const {currentTarget} = event;
        const dataIndex = currentTarget.dataset.columnIndex;
        const order = orders[dataIndex];

        const clickedPosition = {
            x: event.clientX,
            y: event.clientY
        };

        const startPosition = {
            x: currentTarget.offsetLeft,
            y: currentTarget.offsetTop
        };

        const observedPoint = {
            x: startPosition.x + currentTarget.offsetWidth / 2,
            y: startPosition.y + currentTarget.offsetHeight / 2
        };

        const positionRelativeToStart = {
            x: 0,
            y: 0
        };

        const draggedColumn = {
            target: refDraggingTitle,
            dataIndex,
            clickedPosition,
            observedPoint,
            positionRelativeToStart,
            startPosition,
            order
        };

        document.documentElement.style.cursor = 'grabbing !important';
        setDraggedColumn(draggedColumn);
        props.onDraggingColumnStart && props.onDraggingColumnStart({
            dataIndex: draggedColumn.dataIndex
        });
    };

    const onDragMove = (event) => {

        event.preventDefault();
        if (isMoving.current || !draggedColumn.target.current) return;
        setTimeout(() => {
            isMoving.current = false;
        }, 0);

        const newPosition = {
            x: event.clientX - draggedColumn.clickedPosition.x,
            y: event.clientY - draggedColumn.clickedPosition.y
        };

        draggedColumn.target.current.hidden = true;
        const overElement = document.elementFromPoint(newPosition.x + draggedColumn.observedPoint.x, draggedColumn.observedPoint.y);
        draggedColumn.target.current.hidden = false;

        setDraggedColumn({
            ...draggedColumn,
            positionRelativeToStart: newPosition
        });

        let foundElementByDataIndex = findElementByAttribute(overElement, 'data-column-index');

        if (foundElementByDataIndex === null) {
            setDroppableColumn(null);
            return;
        }

        const isPrevDroppableColumn = droppableColumn && droppableColumn.dataIndex === foundElementByDataIndex.dataset.columnIndex;

        if (foundElementByDataIndex && !isPrevDroppableColumn) {
            const dataIndex = foundElementByDataIndex.dataset.columnIndex;

            const propsTarget = foundElementByDataIndex.getBoundingClientRect();
            const leftDiff = propsTarget.left - (newPosition.x + draggedColumn.observedPoint.x);
            const rightDiff = propsTarget.right - (newPosition.x + draggedColumn.observedPoint.x);

            if (leftDiff < 0 && rightDiff < 0) return;

            const droppableColumn = {
                target: foundElementByDataIndex,
                dataIndex,
                order: columnsByDataIndex[dataIndex]
            };
            const currIndex = orders[droppableColumn.dataIndex];
            const newIndex = orders[draggedColumn.dataIndex];
            setDroppableColumn(droppableColumn);
            props.onChangeOrderColumns && props.onChangeOrderColumns(currIndex, newIndex);
        }
        props.onDraggingColumn && props.onDraggingColumn({
            dataIndex: draggedColumn.dataIndex
        });
    };

    const onDragEnd = () => {
        document.body.style.cursor = '';
        setDraggedColumn(null);
        props.onDraggingColumnEnd && props.onDraggingColumnEnd({dataIndex: draggedColumn.dataIndex});
    };

    const computeDistance = (start, end) => end - start;

    const computeWidthWithDistance = (width, distance) => width + distance;

    const adjustWidth = (dataIndex, width) => {

        const canDecreaseColumnWidth = (dataIndex, width) => {
            const minWidth = columnsByDataIndex[dataIndex].minWidth || 0;
            return minWidth <= width;
        };

        const canIncreaseColumnWidth = (dataIndex, width) => {
            const maxWidth = columnsByDataIndex[dataIndex].maxWidth || Infinity;
            return maxWidth >= width;
        };

        const canIncrease = canIncreaseColumnWidth(dataIndex, width);
        const canDecrease = canDecreaseColumnWidth(dataIndex, width);

        if (!canIncrease)
            return columnsByDataIndex[dataIndex].maxWidth;
        if (!canDecrease)
            return columnsByDataIndex[dataIndex].minWidth;

        return width;

    };

    const onResizeStart = (event) => {
        event.stopPropagation();

        const dataIndex = event.target.dataset.index;
        document.documentElement.style.cursor = 'col-resize';

        setResizingColumn(
            {
                dataIndex,
                startPosition: event.clientX
            }
        );
        props.onResizeColumnStart && props.onResizeColumnStart({dataIndex});
    };

    const onResize = (event) => {
        event.preventDefault();
        const UPDATE_RESIZE_MOVE = 0;
        const mouseX = event.clientX;

        if (isResizing.current) return;
        isResizing.current = true;
        setTimeout(() => {
            isResizing.current = false;
        }, UPDATE_RESIZE_MOVE);

        const columnWidth = widths[resizingColumn.dataIndex];
        const distance = computeDistance(resizingColumn.startPosition, mouseX);
        const width = adjustWidth(resizingColumn.dataIndex, computeWidthWithDistance(columnWidth, distance));

        resizeColumn(resizingColumn.dataIndex, width);
    };

    const onResizeEnd = () => {
        setResizingColumn(null);
        isResizing.current = false;
        document.documentElement.style.cursor = '';
        props.onResizeColumnEnd && props.onResizeColumnEnd({dataIndex: resizingColumn.dataIndex});
    };

    const resizeColumn = (dataIndex, width) => {
        props.onResizeColumn && props.onResizeColumn({dataIndex, width})
    };

    const onSort = (event) => {

        const {target} = event;
        event.preventDefault();
        event.stopPropagation();

        const dataIndex = target.dataset.index;
        sorters[dataIndex].count += 1;

        sorters[dataIndex].onSort && sorters[dataIndex].onSort({
            data: props.data,
            dataIndex,
            count: sorters[dataIndex].count
        });

    };

    const getRowsHeights = () => {
        let rowsHeights = {};
        for (let key in refsRows.current) {
            const row = refsRows.current[key];
            rowsHeights[key] = row.current.offsetHeight;
        }

        return rowsHeights;
    };

    const onScrollTable = (event) => {
        setTableScrollTop(event.target.scrollTop);
        setTableScrollLeft(event.target.scrollLeft);
    };

    const onExpand = (event) => {
        const key = +event.currentTarget.dataset.key;
        if (lastExpandKey.current === key) {
            setExpand(null);
            lastExpandKey.current = null;
        } else if (dataByKey[key].expand) {
            setExpand({
                content: dataByKey[key].expand,
                key: key
            });
            lastExpandKey.current = key;
        }
    };

    useEffect(() => {
        setDataByKey(convertArrayToObjectByProp(props.data, 'key'));
    }, [props.data]);

    useLayoutEffect(() => {
        if (props.fixedHeader)
            setHeightFixedHeader(refTitles.current.offsetHeight);
        return () => {
            if (props.fixedHeader)
                setHeightFixedHeader(0);
        }
    }, [props.fixedHeader]);

    useLayoutEffect(() => {
        if (resizingColumn) {
            window.addEventListener('mousemove', onResize);
            window.addEventListener('mouseup', onResizeEnd);
        }
        return () => {
            if (resizingColumn) {
                window.removeEventListener('mousemove', onResize);
                window.removeEventListener('mouseup', onResizeEnd);
            }
        };
    }, [resizingColumn]);

    useLayoutEffect(() => {
        setColumnsByDataIndex(convertArrayToObjectByProp(props.columns, 'dataIndex'));
        setOrders(getOrdersFromColumns());
        setSorters(getSortersFromColumns());
        setWidths(getWidthsFromColumns());
    }, [props.columns]);

    useLayoutEffect(() => {

        if (draggedColumn) {
            window.addEventListener('mouseup', onDragEnd);
            window.addEventListener('mousemove', onDragMove);
        }

        return () => {
            window.removeEventListener('mouseup', onDragEnd);
            window.removeEventListener('mousemove', onDragMove);
        };

    }, [draggedColumn]);

    useLayoutEffect(() => {
        const rowsHeights = getRowsHeights();
        setRowsHeights(rowsHeights);
    }, [props.columns, props.data, expand]);

    useEffect(() => {
        if(expand) {
            setExpandHeight(refExpand.current.offsetHeight);
            setExpandTop(rowsHeights[expand.key] + refsRows.current[expand.key].current.offsetTop);
        }
        return () => {
            setExpandHeight(null);
            setExpandTop(null);
        };
    }, [expand]);

    const renderRows = () => {
        refsRows.current = {};
        return (
            props.data.map((row) => {
                refsRows.current[row.key] = createRef();
                return (
                    <div
                        className={classNames(style.wrapperRow)}
                        key={row.key}
                        ref={refsRows.current[row.key]}
                    >
                        <div
                            className={classNames(style.row, props.classNames.row)}
                            data-key={row.key}
                            onClick={onExpand}
                            style={{
                                paddingBottom: expand && row.key === expand.key && expandHeight || 0
                            }}
                        >
                            {
                                props.columns.map(cell => {
                                    return (
                                        <Cell
                                            dataIndex={cell.dataIndex}
                                            style={{
                                                width: widths[cell.dataIndex],
                                            }}
                                            key={cell.dataIndex}
                                            className={
                                                classNames(
                                                    draggedColumn && draggedColumn.dataIndex === cell.dataIndex && style.hidden,
                                                    props.classNames.cell,
                                                    cell.className
                                                )
                                            }
                                        >
                                            {row[cell.dataIndex]}
                                        </Cell>
                                    );
                                })
                            }
                        </div>
                    </div>
                );
            })
        );
    };

    const renderTitles = () => {

        return props.columns.map((column) => {
            return (
                <span
                    style={{
                        width: widths[column.dataIndex]
                    }}
                    className={
                        classNames(
                            draggedColumn && draggedColumn.dataIndex === column.dataIndex && style.hidden,
                            style.title,
                            props.classNames.title,
                            column.className,
                        )
                    }
                    key={column.dataIndex}
                    onMouseDown={onDragStart}
                    data-column-index={column.dataIndex}
                >
                {column.title}
                    <span
                        data-index={column.dataIndex}
                        className={classNames(style.resizer, props.resizerClassName)}
                        onMouseDown={onResizeStart}
                    />
                    {sorters[column.dataIndex] &&
                    React.cloneElement(
                        sorters[column.dataIndex].trigger,
                        {
                            onMouseDown: onSort,
                            ['data-index']: column.dataIndex
                        }
                    )}
                </span>
            );

        });

    };

    const renderDraggingHeader = () => {
        if (!draggedColumn) return;

        return (

            <div
                className={classNames(style.head, style.draggingHead, props.classNames.head, props.draggingClassNames.head)}
                style={{
                    transform: `translate(${draggedColumn.positionRelativeToStart.x}px, 0)`,
                    left: draggedColumn.startPosition.x,
                    top: draggedColumn.startPosition.y
                }}
                ref={refDraggingTitle}
            >
                <span
                    className={classNames(
                        style.title,
                        props.classNames.title,
                        props.draggingClassNames.title,
                        columnsByDataIndex[draggedColumn.dataIndex].className
                    )}
                    style={{
                        width: widths[draggedColumn.dataIndex]
                    }}
                >
                    {columnsByDataIndex[draggedColumn.dataIndex].title}
                    {sorters[draggedColumn.dataIndex] && sorters[draggedColumn.dataIndex].trigger}
                </span>
            </div>
        );

    };

    const renderFixedHeader = () => {
        return (
            <div
                className={classNames(style.head, props.classNames.head, style.fixedHead)}
                style={{
                    transform: `translate(0, ${tableScrollTop}px)`
                }}
                ref={refTitles}
            >
                {renderTitles()}
                {renderDraggingHeader()}
            </div>
        );
    };

    const renderSimpleHeader = () => {
        return (
            <div
                className={classNames(style.head, props.classNames.head)}
                ref={refTitles}
            >
                {renderTitles()}
                {renderDraggingHeader()}
            </div>
        );
    };

    const renderExpand = () => {
        return (
            React.cloneElement(
                expand.content,
                {
                    style: {
                        width: Math.min(refTable.current.clientWidth, refTableBody.current.clientWidth),
                        position: 'absolute',
                        top: expandTop || 0,
                        left: tableScrollLeft || 0
                    },
                    ref: refExpand
                },
                expand.content.props.children
            )
        );
    };

    const renderDraggingContent = () => {

        return (
            (
                <div
                    className={classNames(
                        style.body,
                        props.classNames.body,
                        style.draggingContent,
                        props.draggingClassNames.body
                    )}
                    style={{
                        width: widths[draggedColumn.dataIndex],
                        transform: `translate(${draggedColumn.positionRelativeToStart.x}px, 0)`,
                        left: draggedColumn.startPosition.x,
                        top: draggedColumn.startPosition.y
                    }}
                >

                    {
                        props.data.map((cell) => {
                            return (
                                <div
                                    className={classNames(style.row, columnsByDataIndex[draggedColumn.dataIndex].className, props.classNames.row, props.draggingClassNames.row)}
                                    key={cell.key}
                                >
                                    <Cell
                                        dataIndex={draggedColumn.dataIndex}
                                        className={classNames(
                                            props.classNames.cell,
                                            props.draggingClassNames.cell
                                        )}
                                        style={{
                                            width: widths[draggedColumn.dataIndex],
                                            height: rowsHeights[cell.key]
                                        }}
                                    >
                                        {
                                            cell[draggedColumn.dataIndex]
                                        }
                                    </Cell>
                                </div>
                            );
                        })
                    }

                </div>
            )
        );

    };

    return (
        <div className={style.wrapper}>
            <div
                className={classNames(style.table, props.tableClassName)}
                ref={refTable}
                onScroll={onScrollTable}
            >

                <div className={style.content}>
                    {
                        props.fixedHeader ? renderFixedHeader() : renderSimpleHeader()
                    }
                    <div
                        className={classNames(style.body, props.classNames.body)}
                        style={{
                            marginTop: heightFixedHeader,
                        }}
                        ref={refTableBody}
                    >
                        {renderRows()}
                        {expand && renderExpand()}
                        {draggedColumn && renderDraggingContent()}
                    </div>
                </div>
            </div>
        </div>
    );

};

TableCustom.propTypes = {
    resizerClassName: PropTypes.string,
    resizingTitleClassName: PropTypes.string,
    classNames: PropTypes.shape({
        body: PropTypes.string,
        row: PropTypes.string,
        cell: PropTypes.string,
        title: PropTypes.string,
        head: PropTypes.string
    }),
    draggingClassNames: PropTypes.shape({
        body: PropTypes.string,
        row: PropTypes.string,
        cell: PropTypes.string,
        title: PropTypes.string,
        head: PropTypes.string
    }),
    columns: PropTypes.arrayOf(
        PropTypes.shape(
            {
                dataIndex: PropTypes.string,
                width: PropTypes.number.isRequired,
                maxWidth: PropTypes.number.isRequired,
                minWidth: PropTypes.number.isRequired,
                title: PropTypes.string,
                sorter: PropTypes.shape({
                    onSort: PropTypes.func.isRequired,
                    trigger: PropTypes.node.isRequired,
                    sortCalled: PropTypes.number
                }),
                className: PropTypes.string
            }
        )
    ).isRequired,
    data: PropTypes.array,
    onResizeColumn: PropTypes.func,
    onResizeColumnStart: PropTypes.func,
    onResizeColumnEnd: PropTypes.func,
    onDraggingColumn: PropTypes.func,
    onDraggingColumnStart: PropTypes.func,
    onDraggingColumnEnd: PropTypes.func,
    fixedHeader: PropTypes.bool,
};

TableCustom.defaultProps = {
    draggingClassNames: {},
    classNames: {}
};


export default TableCustom;