import React, {useLayoutEffect, useState, useRef, createRef, useEffect, useMemo, useCallback} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import ColumnsStorage from "./ColumnsStorage";

import {useScroll} from "./Scroller";

import style from './Table.scss';
import VO from "./VO";

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

const config = {
    translateTimeAnimation: 300
};



const Table = props => {

    const {onScroll, scrollData} = useScroll();

    const [storage, updateStorage] = useState({});
    const [widths, updateWidths] = useState({});
    const [positions, updatePositions] = useState({});
    const [order, updateOrder] = useState([]);

    const translateTransitions = useRef();

    const vo = useRef(order);

    const getWidthsFromColumns = () => {

        const widths = {};

        props.columns.forEach(({key, width}) => {widths[key] = width;});

        return widths;

    };
    const getStartPositions = () => {

        const positions = {};

        props.columns.forEach(({key}) => positions[key] = {left: 0, top: 0});

        return positions;

    };
    const getOrderFromColumns = () => {

        return props.columns.map(({key}) => key);

    };
    const getStorage = () => {
        return new ColumnsStorage(props.columns);
    };
    const getStartTranslateTransitions = () => {
        const transitions = {};

        props.columns.forEach(({key}) => transitions[key] = config.translateTimeAnimation);

        return transitions;
    };
    const zeroizeTranslateTransitions = () => {

        const transitions = {};

        props.columns.forEach(({key}) => transitions[key] = 0);

        return transitions;
    };

    useEffect(() => {

        updateWidths(getWidthsFromColumns());
        updatePositions(getStartPositions());
        updateOrder(getOrderFromColumns());
        updateStorage(getStorage());
        vo.current = getOrderFromColumns();
        translateTransitions.current = getStartTranslateTransitions();

    }, [props.columns]);

    const changeTranslateTransition = ({key, value}) => {
        translateTransitions.current = {...translateTransitions.current, [key]: value};
    };

    // Реализация ресайза колонки

    const changeWidth = ({key, width}) => {

        const {maxWidth, minWidth} = storage.getItem(key);
        let newWidth = width;

        if(width > maxWidth) {
            newWidth = maxWidth;
        } else if(width < minWidth) {
            newWidth = minWidth;
        }

        updateWidths({
            ...widths,
            [key]: newWidth
        });
    };

    const getEmptyResizeable = () => {
        return {
            target: null,
            key: null
        };
    };
    const [resizeable, setResizeable] = useState(() => getEmptyResizeable());

    const createResizeable = (data) => {
        setResizeable(data);
    };
    const removeResizeable = () => {
        setResizeable(getEmptyResizeable());
    };

    const onResizeStart = ({event, key, target}) => {
        const startPointX = event.clientX;
        const startWidth = widths[key];

        document.body.setAttribute('data-cursor-all-resize', 'true');

        createResizeable({
            startPointX,
            startWidth,
            key,
            target
        });
    };

    const onResize = (event) => {
        if(resizeable.key === null) {
            console.error("Вы пытаетесь изменять размер элемента, но самого элемента не существует");
            return;
        }
        event.preventDefault(); // Чтобы текст не выделялся
        const mouseX = event.clientX; // Текущая позиция мыши

        const distance = mouseX - resizeable.startPointX;
        const newWidth = distance + resizeable.startWidth;

        changeWidth({
            key: resizeable.key,
            width: newWidth
        });

    };
    const onResizeEnd = () => {
        document.body.removeAttribute('data-cursor-all-resize');
        removeResizeable();
        props.onChangeWidths && props.onChangeWidths(widths);
    };

    const onResizeableMouseDown = (event) => {
        event.stopPropagation();
        const target = event.currentTarget;
        const key = target.getAttribute('data-resize-key');
        onResizeStart({target, key, event});
    };

    useLayoutEffect(() => {
        if(resizeable.key) {
            window.addEventListener('mousemove', onResize);
            window.addEventListener('mouseup', onResizeEnd);
        }
        return () => {
            if(resizeable.key) {
                window.removeEventListener('mousemove', onResize);
                window.removeEventListener('mouseup', onResizeEnd);
            }
        };
    }, [resizeable]);

    /* Реализация перетаскивания */

    const changePosition = ({key, left, top}) => {
        updatePositions({
            ...positions,
            [key]: {left, top}
        });
    };

    const DragOverElement = ({draggable, droppable}) => {
        const diffs = vo.current.indexToIndex(draggable.key, droppable.key);
        const newPositions = {...positions};

        for(let index = 0;index < order.length;index++) {

            if(order[index] !== draggable.key)
                newPositions[order[index]].left = widths[draggable.key]*diffs[index];
        }

        updatePositions(newPositions);
    };

    const changeDraggablePosition = ({left, top}) => {
        setDraggable({...draggable, left, top});
    };


    const getEmptyDroppable = () => {
        return {
            target: null,
            key: null
        };
    };
    const getEmptyDraggable = () => {
        return {
            target: null,
            key: null
        };
    };

    const [draggable, setDraggable] = useState(() => getEmptyDraggable());
    const [droppable, setDroppable] = useState(() => getEmptyDroppable());

    const createDraggable = (data) => {
        setDraggable(data);
    };
    const removeDraggable = () => {
        if(draggable.key)
            setDraggable(getEmptyDraggable());
    };

    const createDroppable = (data) => {
        setDroppable(data);
    };
    const removeDroppable = () => {
        if(droppable.key)
            setDroppable(getEmptyDroppable());
    };

    const findByAttribute = (element, attr) => {

        let usedElement = element;

        const result = {
            target: null,
            attributeValue: null
        };

        if (!(element instanceof HTMLElement)) return result;

        while (usedElement !== document.documentElement) {
            if (usedElement.hasAttribute(attr)) {
                result.target = usedElement;
                result.attributeValue = usedElement.getAttribute(attr);
                return result;
            }
            usedElement = usedElement.parentNode;
        }

        return result;
    };

    const findDroppable = ({x, y}) => {

        draggable.target.style.visibility = 'hidden';
        const overElement = document.elementFromPoint(x, y);
        draggable.target.style.visibility = 'visible';

        const found = findByAttribute(overElement, 'data-drop-key');

        return {
            key: found.attributeValue,
            target: found.target
        };
    };

    const onDragStart = (event) => {

        vo.current = new VO(order);

        const {clientX: clickedX, clientY: clickedY, target} = event;
        const key = target.getAttribute('data-drag-key');
        const {left: offsetX, top: offsetY} = target.getBoundingClientRect();

        changeTranslateTransition({key, value: 0});

        createDraggable({
            target, key, offsetX, offsetY, clickedX, clickedY, left: 0, top: 0
        });

        document.body.setAttribute('data-cursor-all-grabbing', 'true');

        console.log('%conDragStart', "color: #CDEB49;");
    };

    const onDrop = () => {
        console.log('%conDrop', 'color: #FFA92E;');
    };

    const onDragEnter = ({droppable}) => {
        DragOverElement({droppable, draggable});
        console.log('%conDragEnter', 'color: #6F83FF;');
    };

    const onDragOut = () => {
        console.log('%conDragOut', 'color: #805EEB;');
    };

    const onDrag = (event) => {

        event.preventDefault();

        const newPosition = {
            left: event.clientX - draggable.clickedX,
            top: 0, /* Используем только горизонтальное перетаскивание */
        };

        changeDraggablePosition({
            ...newPosition
        });

        const found = findDroppable({
            x: draggable.offsetX + newPosition.left + draggable.target.offsetWidth / 2,
            y: draggable.offsetY + newPosition.top + draggable.target.offsetHeight / 2,
        });

        if(found.key === null && droppable.key) {
            removeDroppable();
            onDragOut();
        } // Если элемент не найден, то удаляем прошлый droppable
        else if(found.key && droppable.key && found.key !== droppable.key) {
            onDragOut({droppable});
            createDroppable(found);
            onDragEnter({droppable: found});
        } // Перешли с одного элемента на другой
        else if(found.key && droppable.key === null) {
            createDroppable(found);
            onDragEnter({droppable: found});
        } // Если элемент найден, но прошлого не существует

    };

    const onDragEnd = () => {

        if(droppable.key) {
            onDrop({droppable});
        }

        const virtualIndex = vo.current.virtualOrder.indexOf(draggable.key);
        const diffs = vo.current.diffs[vo.current.realOrder.indexOf(draggable.key)];
        let distance = 0;
        if(diffs < 0) {
            distance = vo.current.virtualOrder.filter((_, index) => index <= virtualIndex - diffs && index > virtualIndex).reduce((acc, key) =>{
                return acc + (-1 * widths[key]);
            }, 0);
        }
        if(diffs > 0) {
            distance = vo.current.virtualOrder.filter((_, index) => index >= virtualIndex - diffs && index < virtualIndex).reduce((acc, key) =>{
                return acc + widths[key];
            }, 0);
        }

        removeDraggable();
        removeDroppable();

        changeTranslateTransition({key: draggable.key, value: config.translateTimeAnimation});
        changePosition({
            key: draggable.key,
            left: distance,
            top: 0
        });


        document.body.removeAttribute('data-cursor-all-grabbing');

        console.log('%conDragEnd', "color: #57EB87;");

        new Promise((resolve) => {
            setTimeout(() => {resolve();}, config.translateTimeAnimation);
        }).then(() => {
            updatePositions(getStartPositions());
            translateTransitions.current = zeroizeTranslateTransitions();
            updateOrder(vo.current.virtualOrder);
        });


    };

    const onTitleMouseDown = (event) => {

        closeExpand();
        onDragStart(event);

    };

    useLayoutEffect(() => {
        translateTransitions.current = getStartTranslateTransitions();
        props.onChangeOrder && props.onChangeOrder(order);
    }, [order]);


    useLayoutEffect(() => {
        if(draggable.key) {
            window.addEventListener('mousemove', onDrag);
            window.addEventListener('mouseup', onDragEnd);
        }
        return () => {
            if(draggable.key) {
                window.removeEventListener('mousemove', onDrag);
                window.removeEventListener('mouseup', onDragEnd);
            }
        };
    }, [draggable, droppable]);

    const [expand, updateExpand] = useState({});

    const closeExpand = () => {
        updateExpand({});
    };

    const toggleExpand = (newExpand) => {
        if(expand.index === newExpand.index) {
            closeExpand();
        } else {
            updateExpand(newExpand);
        }
    };

    const onExpand = (event) => {

        const index = +event.currentTarget.getAttribute('data-expand-index');

        const targetHeight = event.currentTarget.offsetHeight;
        const offsetTop = event.currentTarget.offsetTop;

        toggleExpand({
            data: props.data[index],
            top: offsetTop + targetHeight,
            index
        });

    };

    const onRowClick = (event) => {
        onExpand(event);
    };



    const renderExpand = (index) => {
        if(expand.index !== index || !expand.data || !props.expandedRow)
            return null;

        return (
            <div
                className={style.expand}
            >
                <div
                    className={style.expandWrapper}
                    style={{
                        transform: `translate(${scrollData.left}px,0)`
                    }}
                >
                    {
                        props.expandedRow(expand.data)
                    }
                </div>
            </div>
        );

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
                    order.map(key => {
                        return (
                            <Title
                                key={key}
                                className={classNames(style.title, draggable.key === key && style.draggedColumn)}
                                style={{
                                    width: widths[key],
                                    transform: draggable.key === key ? `translate(${draggable.left}px, ${draggable.top}px)` : `translate(${positions[key].left}px, ${positions[key].top}px)`,
                                    transition: `transform ${translateTransitions.current[key]}ms ease`,
                                }}
                                data-drag-key={key}
                                data-drop-key={key}
                                onMouseDown={onTitleMouseDown}
                            >
                                {storage.getItem(key).title}
                                <span
                                    data-resize-key={key}
                                    className={style.resizeable}
                                    onMouseDown={onResizeableMouseDown}
                                    style={{
                                        transform: `translate(${widths[key]}px, 0)`
                                    }}
                                >
                                </span>
                            </Title>
                        );
                    })
                }
            </div>
        );
    };

    const renderRows = () => {

        return props.data.map((row, index) => {
            return (
                <div
                    key={row.key}
                    className={classNames(style.wrapperRow)}
                >
                    <div
                        className={style.row}
                        data-expand-index={index}
                        onClick={onRowClick}
                    >
                        {
                            order.map(key => (
                                <Cell
                                    key={key}
                                    style={{
                                        width: widths[key],
                                        transform: draggable.key === key ? `translate(${draggable.left}px, ${draggable.top}px)` : `translate(${positions[key].left}px, ${positions[key].top}px)`,
                                        transition: `transform ${translateTransitions.current[key]}ms ease`,
                                    }}
                                >
                                    {storage.getItem(key).render(row)}
                                </Cell>
                            ))
                        }
                    </div>
                    {renderExpand(index)}
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
        key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
    fixedHeader: PropTypes.bool,
    onChangeWidth: PropTypes.func,
    expandedRow: PropTypes.func,
    onChangeOrder: PropTypes.func,
    onChangeWidths: PropTypes.func,
};

Table.defaultProps = {
    data: [],
    columns: {}
};


export default Table;
