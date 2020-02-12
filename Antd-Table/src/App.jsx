import React, {useState, useRef, useEffect} from 'react';
import classNames from 'classnames';

import style from './App.scss';
import TableHTML from "./components/TableHTML/TableHTML";
import TableCustom from "./components/TableCustom/TableCustom";
import TableDrag from "./components/TableDrag/TableDrag";

let random = [
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit adipisicing elit`,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae. consectetur adipisicing elit. Atque, molestiae. consectetur adipisicing elit. Atque, molestiae.`,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae. consectetur adipisicing elit. Atque, molestiae.`,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae.`,
    `Lorem ipsum dolor sit amet`,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae. elit. Atque, molestiae elit. Atque, molestiae`,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, molestiae. adipisicing elit. Atque, molestiae.`
];

function createData(num) {
    const data = [];

    for(let i = 0;i<num;i++ ){
        const name = random[Math.floor(Math.random()*random.length)];
        const surname = random[Math.floor(Math.random()*random.length)];
        const age = random[Math.floor(Math.random()*random.length)];
        data.push(
            {
                name,
                surname,
                age,
                key: Math.floor(Math.random()*8999999 + 1000000),
                expand: (
                    <div className={style.expand}>
                        {`${name} ${age} ${surname}`}
                    </div>
                )
            }
        );
    }
    return data;
}

const data = createData(20);

const App = (props) => {

    const [sortedColumnDataIndex, setSortedColumnDataIndex] = useState(null);

    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);

    const [columns, setColumns] = useState(
        [
            {
                title: "Имя dksao dsadsadsa dsadsa",
                dataIndex: "name",
                width: 150,
                minWidth: 150,
                maxWidth: 600,
            },
            {
                title: "Фамилия",
                dataIndex: "surname",
                width: 150,
                minWidth: 150,
                maxWidth: 600
            },
            {
                title: "Возраст",
                dataIndex: "age",
                width: 150,
                minWidth: 150,
                maxWidth: 600,
            }
        ]
    );

    const onChangeOrderColumns = (currIndex, newIndex) => {

        const newColumns = columns.slice();

        const buffer = newColumns[currIndex];
        newColumns[currIndex] = newColumns[newIndex];
        newColumns[newIndex] = buffer;

        setColumns([...newColumns]);
    };

    const onResizeColumn = ({dataIndex, width}) => {
        let newColumns = [...columns];

        newColumns = newColumns.map((column) => {
            if(column.dataIndex === dataIndex) {
                column.width = width;
            }
            return column;
        });

        setColumns(newColumns);
    };

    const onResizeStart = ({dataIndex}) => {
        setResizing(true);
    };
    const onResizeEnd = ({dataIndex}) => {
        setResizing(false);
    };
    const onDragStart = ({dataIndex}) => {
        setDragging(true);
    };
    const onDragEnd = ({dataIndex}) => {
        setDragging(false);
    };

    return (
                <TableCustom
                    columns={columns}
                    data={data}
                    onDraggingColumnStart={onDragStart}
                    onDraggingColumnEnd={onDragEnd}
                    onResizeColumnStart={onResizeStart}
                    onResizeColumnEnd={onResizeEnd}
                    resizerClassName={style.resizer}
                    tableClassName={classNames(style.table, resizing && style.resizing, dragging && style.dragging)}
                    onChangeOrderColumns={onChangeOrderColumns}
                    onResizeColumn={onResizeColumn}
                    classNames={{
                        title: classNames(style.title),
                        cell: classNames(style.cell),
                        row: classNames(style.row),
                        head: classNames(style.head),
                        body: classNames(style.body)
                    }}
                    draggingClassNames={{
                        cell: style.draggingCell,
                        row: style.draggingRow,
                        title: style.draggingTitle,
                        body: style.draggingBody,
                        head: style.draggingHead
                    }}
                    fixedHeader
                />
    );
};

export default App;