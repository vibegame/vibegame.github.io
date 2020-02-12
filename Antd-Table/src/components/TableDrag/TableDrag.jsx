import React, {useState, useEffect, createRef, useRef, useLayoutEffect} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import style from './TableDrag.scss';

const convertArrayToObjectByProp = (array, prop) => {
    const object = {};
    array.forEach((element, index) => {
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

const TableDrag = (props) => {

    const [draggedColumn, setDraggedColumn] = useState(null);
    const [droppableColumn, setDroppableColumn] = useState(null);

    const refDraggedColumn = useRef(null);

    const isMoving = useRef(false);
    const dataColumns = convertArrayToObjectByProp(props.columns, 'dataIndex');

    const onDragStart = (event) => {

        const {target} = event;
        const dataIndex = target.dataset.headIndex;
        const order = target.dataset.headOrder;
        const columnRef = dataColumns[dataIndex].ref.current;
        const columnProps = columnRef.getBoundingClientRect();
        const height = columnProps.height;

        const clickedPosition = {
            x: event.clientX,
            y: event.clientY
        };

        const startPosition = {
            x: columnProps.left,
            y: columnProps.top
        };

        const observedPoint = {
            x: startPosition.x + target.offsetWidth / 2,
            y: startPosition.y + target.offsetHeight / 2
        };

        const positionRelativeToStart = {
            x: 0,
            y: 0
        };

        const draggedColumn = {
            target: refDraggedColumn,
            dataIndex,
            clickedPosition,
            height,
            observedPoint,
            positionRelativeToStart,
            startPosition,
            order
        };

        setDraggedColumn(draggedColumn);
    };

    const onDragEnd = (event) => {

        if(droppableColumn) {
            const currIndex = +droppableColumn.order;
            const newIndex = +draggedColumn.order;
            props.onChangeOrderColumns && props.onChangeOrderColumns(currIndex, newIndex);
            setDroppableColumn(null);
        }

        setDraggedColumn(null);
    };

    const onDragMove = (event) => {

        event.preventDefault();
        if(isMoving.current) return;

        setTimeout(() => {
            isMoving.current = false;
        }, 5);

        const newPosition = {
            x: event.clientX - draggedColumn.clickedPosition.x,
            y: event.clientY - draggedColumn.clickedPosition.y
        };

        draggedColumn.target.current.hidden = true;
        const overElement = document.elementFromPoint(newPosition.x + draggedColumn.observedPoint.x, newPosition.y + draggedColumn.observedPoint.y);
        draggedColumn.target.current.hidden = false;

        let foundElementByIndex = findElementByAttribute(overElement, 'data-column-index');

        if(droppableColumn && droppableColumn.target !== foundElementByIndex) {
            setDroppableColumn(null);
        }

        if(foundElementByIndex) {
            const droppableColumn = {
                target: foundElementByIndex,
                dataIndex: foundElementByIndex.dataset.columnIndex,
                order: foundElementByIndex.dataset.columnOrder
            };

            setDroppableColumn(droppableColumn);
        }

        setDraggedColumn({
            ...draggedColumn,
            positionRelativeToStart: newPosition
        });
    };

    const onDrop = (dragged, droppable) => {

        console.log(dragged, droppable);

    };

    const onDragOver = (dragged, droppable) => {

        console.log(dragged, droppable);

    };

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


    return (

        <div className={style.table}>
            {
                props.columns.map((column, index) => {

                    dataColumns[column.dataIndex].ref = createRef();

                    return (
                        <div
                            key={column.dataIndex}
                            className={classNames(style.column, draggedColumn && draggedColumn.dataIndex === column.dataIndex && style.hidden)}
                            style={{
                                width: column.width
                            }}
                            data-column-index={column.dataIndex}
                            data-column-order={index}
                            ref={dataColumns[column.dataIndex].ref}
                        >

                            <span
                                className={style.head}
                                data-head-index={column.dataIndex}
                                data-head-order={index}
                                onMouseDown={onDragStart}
                            >
                                {column.title}
                            </span>

                            <div className={style.body}>
                                {
                                    props.data.map((cell) => {
                                        return (
                                            <span key={cell.key} className={style.cell}>
                                             {
                                                 cell[column.dataIndex]
                                             }
                                            </span>
                                        );
                                    })
                                }
                            </div>

                        </div>
                    );

                })
            }

            {draggedColumn && (
                <div
                    className={style.draggingColumn}
                    style={{
                        width: dataColumns[draggedColumn.dataIndex].width,
                        height: draggedColumn.height,
                        left: draggedColumn.startPosition.x,
                        top: draggedColumn.startPosition.y,
                        transform: `translate(${draggedColumn.positionRelativeToStart.x}px, ${draggedColumn.positionRelativeToStart.y}px)`
                    }}
                    ref={refDraggedColumn}
                >

                    <span className={style.head}>
                        {dataColumns[draggedColumn.dataIndex].title}
                    </span>

                    <div className={style.body}>
                        {
                            props.data.map((cell) => {
                                return (
                                    <span key={cell.key} className={style.cell}>
                                         {
                                             cell[draggedColumn.dataIndex]
                                         }
                                    </span>
                                );
                            })
                        }
                    </div>

                </div>
            )}

        </div>

    );


};

TableDrag.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    onChangeOrderColumns: PropTypes.func
};

export default TableDrag;