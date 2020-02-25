import Scalable from "./Scalable";

import Draggable from "./Draggable";


class Storage {

    _props = {};

    constructor(props) {
        this._props = props;
        this._storage = new Map();
    }

    addItem = ({key, item}) => {
        if(!this._storage.has(key))
            return this._storage.set(key, item);
        else
            console.warn(`Storage has item with key ${key}`)
    };

    getItem = (key) => {
        if(this._storage.has(key))
            return this._storage.get(key);
        else
            console.warn(`Storage does not have item with key ${key}`)
    };

    get items() {
        const items = [];

        for(let key of this.keys) {
            items.push(this.getItem(key));
        }

        return items;
    }

    clear() {
        this._storage.clear();
    }

    get keys() {
        const keys = [];
        for(let key of this._storage.keys()) {
            keys.push(key);
        }
        return keys;
    }

}

class ColumnsStorage extends Storage {
    constructor(props) {
        super(props);
        this._createStorage(props.columns);
    }

    _createStorage(columns) {
        columns.forEach(({key, ...column}) => {
            this.addItem({key, item: column});
        });
    }
}

class WidthsStorage extends ColumnsStorage {

    constructor(props) {
        super(props);
        this.__updateWidths();
    }

    get widths() {
        const widths = {};

        this.keys.forEach(key => {
            widths[key] = this.getItem(key).width;
        });

        return widths;
    }

    changeWidth = ({key, width}) => {
        const item = this.getItem(key);
        const {maxWidth, minWidth} = item;

        if(width > maxWidth) {
            item.width = maxWidth;
        } else if(width < minWidth) {
            item.width = minWidth;
        } else {
            item.width = width;
        }

        this.__updateWidths();

    };

    __updateWidths() {
        this._props.updateWidths && this._props.updateWidths(this.widths);
    }
}

class PositionsStorage extends WidthsStorage {

    constructor(props) {
        super(props);
        this._positions = {};

        this.keys.forEach((key) => {
            this._positions[key] = {
                top: 0,
                left: 0
            };
        });
        this._props.updatePositions && this._props.updatePositions(this.positions);
    }

    changePosition = ({key, left, top}) => {
        this._positions[key] = {
            left, top
        };

        this.__updatePositions();

    };

    __updatePositions() {
        this._props.updatePositions && this._props.updatePositions(this.positions);
    }

    setPositions(positions) {
        for(let key of positions) {
            this._positions[key] = positions[key];
        }
        this.__updatePositions();
    }

    get positions() {
        return {...this._positions};
    }

}

class StorageOrder extends PositionsStorage {

    constructor(props) {
        super(props);
        this._order = this.keys;
        this.__updateOrder();
    }

    __updateOrder() {
        this._props.updateOrder && this._props.updateOrder(this.order);
    }

    setOrder(newOrder) {
        this._order = newOrder;
        this.__updateOrder();
    }

    get order() {
        return [...this._order];
    }
}

class StorageManager extends StorageOrder {

    constructor(props) {
        super(props);
        this.drag = new Draggable({
            draggableAttribute: props.draggableAttribute
        });

        this.drag.subscribes.subscribe("dragend", props.onDragEnd);

        this.drag.subscribes.subscribe("dragend", props.onDragStart);

        this.resize = new Scalable({
            getWidth: this.getWidth
        });

        this.resize.subscribes.subscribe("onresizestart", props.onResizeStart);
        this.resize.subscribes.subscribe('onresize', this.onResize);
        this.resize.subscribes.subscribe("onresizeend", props.onResizeEnd);
    }

    onResize = ({target, width}) => {
        const key = target.dataset.resizeKey;

        this.changeWidth({key, width});
    };

    getWidth = (event) => {
        const key = event.currentTarget.dataset.resizeKey;
        return this.widths[key];
    }

}



export default StorageManager;